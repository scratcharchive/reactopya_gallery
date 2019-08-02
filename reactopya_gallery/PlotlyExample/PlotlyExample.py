from reactopya import Component
import numpy as np


class PlotlyExample(Component):
    def __init__(self):
        super().__init__()

    def javascript_state_changed(self, prev_state, state):
        x0 = np.linspace(0, 1, 500)
        y0 = np.sin((x0**2) * 2 * np.pi * 12)
        y1 = y0 * x0**2
        self.set_python_state(dict(
            series=[
                dict(x=x0, y=y0),
                dict(x=x0, y=y1)
            ]
        ))
