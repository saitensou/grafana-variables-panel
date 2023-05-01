import { PanelPlugin } from '@grafana/data';
import { PanelOptions } from './types';
import { VariablePanel } from './components/VariablePanel';

export const plugin = new PanelPlugin<PanelOptions>(VariablePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'varID',
      name: 'Variable ID',
      description: 'Variable ID',
      defaultValue: '-',
    })
    .addBooleanSwitch({
      path: 'tableHeader',
      name: 'Table Header',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'horizontalTable',
      name: 'Horizontal Table',
      defaultValue: false,
    })
});
