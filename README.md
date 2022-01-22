# Vanilla tweaks

Inspired by https://vanillatweaks.net

## Development

Create folder `mc-tower`:

```bash
mkdir mc-tower
cd mc-tower
```

and clone inside two repos - `vanilla-tweaks` *and* `packs`, then

```bash
cd vanilla-tweaks

ln -s ../packs packs

yarn install
yarn dev
```
