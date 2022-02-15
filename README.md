# Minecraft tweaks

Inspired by https://vanillatweaks.net

## Development

Clone [dev-workspace](//github.com/minetower/dev-workspace#setup), then

```bash
./scripts/clone.sh --needed=minecraft-tweaks

cd packs
yarn install
yarn build

cd ../minecraft-tweaks
yarn install
yarn dev
```
