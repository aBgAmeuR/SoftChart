import React from 'react';


export type AttributeProps = {
  name: string,
  type: string,
  visibility?: string
};

export type MethodProps = {
  name: string,
  visibility: string,
  return: string,
  parameters?: Parameters[]
};

export type Parameters = {
  name: string,
  type: string
};

class Attribute extends React.Component<AttributeProps, object> {

  getVisibility() {
    if (this.props.visibility === "public") {
      return "+";
    } else if (this.props.visibility === "private") {
      return "-";
    } else if (this.props.visibility === "protected") {
      return "#";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="attribute">
        <span>{this.getVisibility() + (this.props.name || '') + ': ' + (this.props.type || '')}</span>
      </div>
    );
  }
}

class Method extends React.Component<MethodProps, object> {

  getVisibility() {
    if (this.props.visibility === "public") {
      return "+";
    } else if (this.props.visibility === "private") {
      return "-";
    } else if (this.props.visibility === "protected") {
      return "#";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="method">
        <span>{this.getVisibility() + (this.props.name || '') + '('}</span>
        <div className='parameters'>
          {this.props.parameters && this.props.parameters.map((parameter, i) => {
            return <span key={i}>{parameter.name}: {parameter.type}{i < (this.props.parameters?.length ?? 0) - 1 ? ', ' : ''}</span>;
          })}

        </div>
        <span>{'): ' + (this.props.return || '')}</span>
      </div>
    );
  }
}

export { Attribute, Method };
