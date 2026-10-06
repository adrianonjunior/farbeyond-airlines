import { useMemo, useRef, useState } from 'react';
import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import countries from 'world-atlas/countries-110m.json';
import { branches, findBranch, type Branch, type Route } from '@fbd/shared';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';

const topology = countries as unknown as Topology;
const land = feature(
  topology,
  topology.objects.countries!,
) as unknown as FeatureCollection<Geometry>;

type Props = {
  selectedBranch: Branch;
  selectedRoute?: Route;
  onSelect: (branch: Branch) => void;
  compact?: boolean;
};

export default function Globe({ selectedBranch, selectedRoute, onSelect, compact = false }: Props) {
  const [rotation, setRotation] = useState<[number, number]>([
    -selectedBranch.longitude,
    -selectedBranch.latitude,
  ]);
  const drag = useRef<{ x: number; y: number; rotation: [number, number] } | null>(null);
  const size = compact ? 430 : 590;
  const center = size / 2;

  const projection = useMemo(
    () =>
      geoOrthographic()
        .scale(size * 0.45)
        .translate([center, center])
        .rotate(rotation)
        .clipAngle(90),
    [center, rotation, size],
  );
  const path = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => path(geoGraticule10()), [path]);

  const routePath = useMemo(() => {
    if (!selectedRoute) return null;
    const from = findBranch(selectedRoute.from);
    const to = findBranch(selectedRoute.to);
    if (!from || !to) return null;
    const interpolate = geoInterpolate(
      [from.longitude, from.latitude],
      [to.longitude, to.latitude],
    );
    const coordinates = Array.from({ length: 65 }, (_, index) => interpolate(index / 64));
    return path({ type: 'LineString', coordinates });
  }, [path, selectedRoute]);

  function showBranch(branch: Branch) {
    setRotation([-branch.longitude, -branch.latitude]);
    onSelect(branch);
  }

  return (
    <div className="globe-wrap">
      <svg
        className="globe-svg"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Globo com filiais FarBeyond Airlines. Use a lista de filiais para navegar por teclado."
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY, rotation };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = (event.clientX - drag.current.x) * 0.35;
          const dy = (event.clientY - drag.current.y) * 0.35;
          setRotation([
            drag.current.rotation[0] + dx,
            Math.max(-70, Math.min(70, drag.current.rotation[1] - dy)),
          ]);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <defs>
          <radialGradient id="ocean" cx="35%" cy="28%">
            <stop offset="0" stopColor="#2b668f" />
            <stop offset=".58" stopColor="#124568" />
            <stop offset="1" stopColor="#082945" />
          </radialGradient>
          <clipPath id="sphereClip">
            <circle cx={center} cy={center} r={size * 0.45} />
          </clipPath>
        </defs>
        <circle className="globe-halo" cx={center} cy={center} r={size * 0.48} />
        <circle cx={center} cy={center} r={size * 0.45} fill="url(#ocean)" />
        <g clipPath="url(#sphereClip)">
          <path d={graticule ?? ''} fill="none" stroke="#94c1da" strokeWidth=".65" opacity=".22" />
          {land.features.map((country, index) => (
            <path
              key={index}
              d={path(country) ?? ''}
              fill="#9bc4d9"
              fillOpacity=".72"
              stroke="#d2e6ee"
              strokeOpacity=".48"
              strokeWidth=".55"
            />
          ))}
          {routePath && (
            <path
              className="globe-route"
              d={routePath}
              fill="none"
              stroke="#e4b962"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="7 7"
            />
          )}
          {branches.map((branch) => {
            const visible =
              geoDistance([branch.longitude, branch.latitude], [-rotation[0], -rotation[1]]) <
              Math.PI / 2;
            const point = projection([branch.longitude, branch.latitude]);
            if (!visible || !point) return null;
            return (
              <g
                key={branch.code}
                transform={`translate(${point[0]} ${point[1]})`}
                className="globe-marker"
              >
                <circle
                  r={branch.code === selectedBranch.code ? 12 : 8}
                  fill="#fff"
                  opacity=".24"
                />
                <circle
                  r={branch.code === selectedBranch.code ? 6 : 4}
                  fill={branch.code === selectedBranch.code ? '#d9a64f' : '#fff'}
                />
                <text x="11" y="-10" fill="#fff" fontSize="12" fontWeight="700">
                  {branch.code}
                </text>
              </g>
            );
          })}
        </g>
        <circle
          cx={center}
          cy={center}
          r={size * 0.45}
          fill="none"
          stroke="#a6d6eb"
          strokeOpacity=".42"
          strokeWidth="1"
        />
      </svg>
      {!compact && <div className="globe-hint">Arraste para girar o globo</div>}
      {!compact && (
        <div className="globe-controls" aria-label="Filiais no globo">
          {branches.map((branch) => (
            <button
              key={branch.code}
              type="button"
              className={branch.code === selectedBranch.code ? 'active' : ''}
              onClick={() => showBranch(branch)}
              aria-pressed={branch.code === selectedBranch.code}
            >
              {branch.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
