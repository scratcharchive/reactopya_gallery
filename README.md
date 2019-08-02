# reactopya_gallery

This project contains a collection of example reactopya widgets.

## Prerequisites

* Python >= 3.6
* NodeJS >= 8
* Yarn

(Tested on Linux only)

## Installation and usage

This gallery has a dependency on [reactopya](https://github.com/flatironinstitute/reactopya). However, for development purposes, this is currently distributed as a submodule. So, you should clone this repo via:

```
git clone --recursive [URL to Git repo]
```

Or if you have already cloned, then do:

```
git submodule update --init
```

For subsequent pulls:

```
git pull --recurse-submodules
```


To install the Python packages in development mode:

```
pip install -e reactopya
pip install -e .
```

Now install and open the gallery as an electon app in development mode (with hot module reloading):

```
yarn install
yarn electron-dev
```

You should see a scrollable list of example widgets.