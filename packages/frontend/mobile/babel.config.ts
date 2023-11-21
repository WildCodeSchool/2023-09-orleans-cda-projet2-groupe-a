export default function (api: unknown) {
  // @ts-expect-error - no types
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
}
