'use client'

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/typings';
import getImagePath from '@/lib/getImagePath';

type TmdbImage = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type ImagesResponse = {
  backdrops: TmdbImage[];
  posters: TmdbImage[];
  logos?: TmdbImage[];
};

type Props = {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
  initialIndex?: number | null;
};

export default function MovieImagesModal({ movie, open, onClose, initialIndex = null }: Props) {
  const [data, setData] = useState<ImagesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!open || !movie) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/movie/${movie.id}/images`);
        if (!res.ok) throw new Error(`Failed to load images (${res.status})`);
        const json = (await res.json()) as ImagesResponse;
        if (active) setData(json);
      } catch (e: any) {
        if (active) setError(e?.message ?? 'Failed to load');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [open, movie]);

  const images = useMemo(() => {
    if (!data) return [] as TmdbImage[];
    // Prefer backdrops, fallback to posters
    const combined = [...(data.backdrops || []), ...(data.posters || [])];
    // Deduplicate by file_path
    const seen = new Set<string>();
    return combined.filter((img) => {
      if (seen.has(img.file_path)) return false;
      seen.add(img.file_path);
      return true;
    });
  }, [data]);

  // Initialize lightbox index when opening
  useEffect(() => {
    if (open) {
      setSelectedIndex(initialIndex ?? null);
    } else {
      setSelectedIndex(null);
    }
  }, [open, initialIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i === null ? 0 : Math.min(images.length - 1, i + 1)));
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i === null ? 0 : Math.max(0, i - 1)));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, images.length]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-md bg-[#0f111a] shadow-xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-lg font-semibold truncate pr-4">{movie?.title} — Images</h3>
            <button
              onClick={onClose}
              className="inline-flex items-center rounded px-2 py-1 text-sm bg-white/10 hover:bg-white/20"
              aria-label="Close"
            >
              Close
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-auto max-h-[70vh]">
            {loading && <p className="text-sm opacity-80">Loading images…</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}

            {!loading && !error && images.length === 0 && (
              <p className="text-sm opacity-80">No images available.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div
                  key={img.file_path}
                  className="relative w-full aspect-video bg-black/20 rounded overflow-hidden cursor-zoom-in"
                  onClick={() => setSelectedIndex(idx)}
                >
                  <Image
                    src={getImagePath(img.file_path)}
                    alt={movie?.title ?? 'Movie'}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Lightbox viewer */}
      {selectedIndex !== null && images[selectedIndex] && (
        <div className="absolute inset-0 z-[1100] flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={getImagePath(images[selectedIndex].file_path, true)}
              alt={movie?.title ?? 'Movie'}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            {/* Controls */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              className="absolute top-4 right-4 rounded bg-black/60 hover:bg-black/80 text-white px-3 py-1"
            >
              Close
            </button>
            {selectedIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i ?? 0) - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/60 hover:bg-black/80 text-white px-3 py-2"
              >
                ◀
              </button>
            )}
            {selectedIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i ?? 0) + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/60 hover:bg-black/80 text-white px-3 py-2"
              >
                ▶
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
