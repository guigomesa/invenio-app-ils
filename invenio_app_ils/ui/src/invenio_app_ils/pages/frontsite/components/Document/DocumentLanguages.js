import { List } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DocumentLanguages extends Component {
  render() {
    const { metadata, delimiter } = this.props;
    return (
      <>
        <List horizontal className={'document-languages-list'}>
          {metadata
            ? metadata.languages.map((language, index) => (
                <List.Item
                  as={this.props.listItemAs ? this.props.listItemAs : ''}
                  key={`Key${index}`}
                >
                  {language}
                  {index !== metadata.languages.length - 1 ? delimiter : null}
                </List.Item>
              ))
            : null}
        </List>
      </>
    );
  }
}

DocumentLanguages.propTypes = {
  metadata: PropTypes.object.isRequired,
  prefix: PropTypes.string,
  otherAuthorsDisplay: PropTypes.string,
  listItemAs: PropTypes.string,
  delimiter: PropTypes.string.isRequired,
};

DocumentLanguages.defaultProps = {
  delimiter: ', ',
};