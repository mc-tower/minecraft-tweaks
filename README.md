# Minecraft tweaks

Inspired by https://vanillatweaks.net

## Development

Create folder `mc-tower`:

```bash
mkdir mc-tower
cd mc-tower
```

and clone inside two repos - `minecraft-tweaks` *and* `packs`, then

```bash
cd packs
yarn build

cd ../minecraft-tweaks
yarn install
yarn dev
```
