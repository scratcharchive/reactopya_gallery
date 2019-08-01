# reactopy_gallery

This project contains a collection of example reactopy widgets.

## Installation and usage

You must first install the Python package. To install in development mode:

```
pip install -e .
```

Next you need to clone and install the [reactopy repository](https://github.com/flatironinstitute/reactopy), and place it next to this repository. In the future we will use npm and PyPI to handle this dependency.

Now install and open the gallery as an electon app in development mode (with hot module reloading):

```
yarn install
yarn electron-dev
```

You should see a scrollable list of example widgets.