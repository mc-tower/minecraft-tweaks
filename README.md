# Minecraft tweaks

Inspired by https://vanillatweaks.net

## Development

Create folder `minetower`:

```bash
mkdir minetower
cd minetower
```

and clone inside two repos - `minecraft-tweaks` *and* `packs`, then

```bash
cd packs
yarn build

cd ../minecraft-tweaks
yarn install
yarn dev
```
