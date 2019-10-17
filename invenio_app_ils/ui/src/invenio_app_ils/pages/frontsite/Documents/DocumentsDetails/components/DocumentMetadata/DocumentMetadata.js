import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Tab } from 'semantic-ui-react';
import {
  DocumentRelations,
  DocumentInfo,
  DocumentTableOfContent,
  DocumentConference,
} from './components';

export default class DocumentMetadata extends Component {
  constructor(props) {
    super(props);
    this.document = props.documentDetails;
  }

  renderTabPanes = () => {
    return [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane attached={false}>
            <DocumentRelations
              relations={this.document.metadata.relations}
              documentType={this.document.metadata.document_type}
            />
            <DocumentInfo metadata={this.document.metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Content',
        render: () => (
          <Tab.Pane attached={false}>
            <DocumentTableOfContent
              toc={this.document.metadata.table_of_content}
              abstract={this.document.metadata.abstract}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Publications',
        render: () => (
          <Tab.Pane attached={false}>We wait for the schema!</Tab.Pane>
        ),
      },
      {
        menuItem: 'Conference',
        render: () => (
          <Tab.Pane attached={false}>
            <DocumentConference
              conference={this.document.metadata.conference_info}
              documentType={this.document.metadata.document_type}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane attached={false}>
            <Divider horizontal>Librarian's note</Divider>
            {this.document.metadata.note}
          </Tab.Pane>
        ),
      },
    ];
  };

  render() {
    return (
      <Container
        className="document-metadata"
        data-test={this.document.metadata.pid}
      >
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={this.renderTabPanes()}
        />
      </Container>
    );
  }
}

DocumentMetadata.propTypes = {
  documentDetails: PropTypes.object.isRequired,
};