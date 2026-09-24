# MMM-MovieNite

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

It shows the movies for the upcoming movie night from [movies.wowellworld.com](https://movies.wowellworld.com/). ([:octocat: Repo](https://github.com/JHWelch/movies.wowellworld.com))

![Screenshot of the application in use.](/images/screenshot.png?raw=true "Screenshot")

## Installation

In `MagicMirror/modules`

```sh
git clone https://github.com/JHWelch/MMM-MovieNite.git
```

No dependencies are required for usage. See below for development dependencies.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
{
  module: 'MMM-MovieNite',
  config: {
    // See below for configurable options
    // Can be empty
  }
}
```

## Configuration options

| Option           | Required?  | Description                                                            |
| ---------------- | ---------- | ---------------------------------------------------------------------- |
| `updateInterval` | *Optional* | Refresh time in milliseconds <br>Default 3600000 milliseconds (1 hour) |

## Update

### Automatic Update

Did you know MagicMirror² has a built-in module updater? Read more about it [here](https://docs.magicmirror.builders/modules/updatenotification.html#updates-array).

Add the following to your `updates` array of `updatenotification` in `config/config.js`

```js
{ 'MMM-MovieNite': 'git pull' },
```

### Manual Update

In `~/MagicMirror/modules/MMM-MovieNite`

```sh
git pull
```


## Development

### Install

Install including dev dependencies

```sh
npm run install
```

### Testing

There is a test suite using Jest.

```sh
npm test
```

### Linting

There is a linting and formatting setup using ESLint.

```sh
npm run lint

npm run fix
```
