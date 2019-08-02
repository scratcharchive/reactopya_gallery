from reactopy import Component
import numpy as np

class InteractivePlotlyExample(Component):
    def __init__(self):
        super().__init__()

    def on_javascript_state_changed(self, prev_state, state):
        noise_level = state.get('noise_level', 0)
        num_points = state.get('num_points', 10)
        times0 = np.linspace(0, 100, num_points)
        amplitudes0 = times0 + np.random.normal(0, 1, times0.shape) * noise_level
        self.set_python_state(dict(
            series=[dict(
                times=times0,
                amplitudes=amplitudes0
            )]
        ))