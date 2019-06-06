import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import * as ajax from '../../utils/ajax'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const flattenTree = (layers, allLayers) => {
  let data = [];
  layers.forEach(layer => {
    const children = allLayers.filter(sub => sub.parentLayerId === layer.id);
    data.push({
      value: layer.id,
      label: layer.name,
      children: flattenTree(children, allLayers)
    });
  });
  return data;
}

const API_URL = 'https://usa.maintstar.co/MSMap/proxy.ashx?http://g1.maintstar.com:6080/arcgis/rest/services/Pleasanton_gis1/MapServer?f=json&profile=default';

class Treeview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Arcgis Pleasanton',
      nodes: [],
      checked: [],
      expanded: [],
    };
  }

  componentWillMount() {
    this.getTreeData();
  }

  async getTreeData() {
    const response = await ajax.get(API_URL)
    const parentLayers = response.layers.filter(sub => sub.parentLayerId === -1);
    const nodes = flattenTree(parentLayers, response.layers);
    this.setState({ nodes });
  }

  render() {
    const { title, checked, expanded, nodes } = this.state;

    return (
      <div>
        <p>
          {title}
        </p>
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={checked => this.setState({ checked })}
          onExpand={expanded => this.setState({ expanded })}
        />
      </div>
    );
  }
}

export default Treeview;
