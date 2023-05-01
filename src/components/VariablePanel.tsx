import React from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions } from 'types';

interface Props extends PanelProps<PanelOptions> {}

const CSS = {
  table: { border: '2px #808080 solid' },
  cell: { border: '2px #808080 solid', padding: '5px 10px' },
};

const isSameValue = (keys: string[], values: string[]) =>
  keys.length === values.length && keys.every((key, index) => key === values[index]);

const horizontalTable = (keys: string[], values: string[], oneColumn: boolean, tableHeader: boolean) => {
  return (
    <table style={CSS.table}>
      {!oneColumn && (
        <tr>
          {tableHeader && <th style={CSS.cell}>Key</th>}
          {keys.map((key) => (
            <td key={key} style={CSS.cell}>
              {key}
            </td>
          ))}
        </tr>
      )}
      <tr>
        {tableHeader && <th style={CSS.cell}>Value</th>}
        {values.map((value) => (
          <td key={value} style={CSS.cell}>
            {value}
          </td>
        ))}
      </tr>
    </table>
  );
};

const verticalTable = (keys: string[], values: string[], oneColumn: boolean, tableHeader: boolean) => {
  const tbody = [];
  for (let i = 0; i < values.length; i++) {
    tbody.push(
      <tr>
        {!oneColumn && (
          <td key={i} style={CSS.cell}>
            {keys[i]}
          </td>
        )}
        <td key={i} style={CSS.cell}>
          {values[i]}
        </td>
      </tr>
    );
  }
  return (
    <table style={CSS.table}>
      <tr>
        {!oneColumn && tableHeader && <th style={CSS.cell}>Key</th>}
        {tableHeader && <th style={CSS.cell}>Value</th>}
      </tr>
      {tbody}
    </table>
  );
};

export function VariablePanel({ options, replaceVariables }: Props) {
  const before = `\$\{${options.varID}:json\}`;
  const after = replaceVariables(`\$\{${options.varID}:json\}`);
  if (before === after) {
    return <div>Unknown variable: &quot;{options.varID}&quot;. Did you put the variable name instead of ID?</div>;
  }

  const afterJson = JSON.parse(after);
  const values = typeof afterJson === 'string' || afterJson instanceof String ? [afterJson] : afterJson;
  const keysString = replaceVariables(`\$\{${options.varID}:text\}`);
  const keys = keysString.split(' + ');
  const oneColumn = (keys.length === 1 && keys[0] === 'All') || isSameValue(keys, values);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', overflow: "scroll", position: "relative", height: "100%"}}>
      {options.horizontalTable
        ? horizontalTable(keys, values, oneColumn, options.tableHeader)
        : verticalTable(keys, values, oneColumn, options.tableHeader)}
    </div>
  );
}
