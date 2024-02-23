declare module 'use-sound' {
  export function useSound(
    path: string,
    options?: unknown,
  ): [() => void, { stop: () => void; isPlaying: boolean }];
}
