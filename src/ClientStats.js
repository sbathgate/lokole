import React from 'react';
import { Card, Empty, List, Popconfirm, notification } from 'antd';
import axios from 'axios';
import Button from './Button';
import Grid from './Grid';

class ClientCard extends React.Component {
  state = {
    isDeleting: false,
    isFetchingPendingEmails: false,
    numPendingEmails: null,
  };

  _onClickDelete = async () => {
    const { domain, onDelete } = this.props;
    const { isDeleting } = this.state;

    if (isDeleting) {
      return;
    }

    this.setState({ isDeleting: true });
    await onDelete(domain);
    this.setState({ isDeleting: false });
  };

  _onClickFetchPendingEmails = async () => {
    const { domain, fetchNumPendingEmails } = this.props;
    const { isFetchingPendingEmails } = this.state;

    if (isFetchingPendingEmails) {
      return;
    }

    this.setState({ isFetchingPendingEmails: true });
    const numPendingEmails = await fetchNumPendingEmails(domain);
    this.setState({ isFetchingPendingEmails: false, numPendingEmails });
  };

  render() {
    const { domain } = this.props;

    const {
      isDeleting,
      isFetchingPendingEmails,
      numPendingEmails,
    } = this.state;

    return (
      <Card
        actions={[
          <Popconfirm
            title={
              <span>
                This will delete client <em>{domain}</em>.
                <br />
                Are you sure?
              </span>
            }
            cancelText="No, cancel."
            okText="Yes, delete!"
            onConfirm={this._onClickDelete}
            disabled={isDeleting}
          >
            <Button icon={isDeleting ? 'loading' : 'delete'} />
          </Popconfirm>,
          <div>
            <Button
              icon={isFetchingPendingEmails ? 'loading' : 'mail'}
              onClick={this._onClickFetchPendingEmails}
            />
            {this.state.numPendingEmails != null && (
              <span>&nbsp;{numPendingEmails}</span>
            )}
          </div>,
        ]}
        style={{
          textDecoration: isDeleting ? 'line-through' : undefined,
        }}
      >
        {domain}
      </Card>
    );
  }
}

class ClientStats extends React.Component {
  state = {
    clients: [],
    isLoading: true,
  };

  get _client() {
    const {
      serverEndpoint,
      githubUsername,
      githubAccessToken,
    } = this.props.settings;

    return axios.create({
      baseURL: serverEndpoint,
      auth: {
        username: githubUsername,
        password: githubAccessToken,
      },
    });
  }

  get _isEnabled() {
    const { githubUsername, githubAccessToken } = this.props.settings;

    return githubUsername && githubAccessToken;
  }

  _fetchClients = async () => {
    let response;
    try {
      response = await this._client.get('/api/email/register/');
    } catch (e) {
      notification.error({
        message: 'Unable to fetch clients',
        description: (e.response && e.response.data) || e.message,
      });
      return;
    }

    this.setState({
      clients: response.data.clients.sort(),
      isLoading: false,
    });
  };

  _deleteClient = async domain => {
    try {
      await this._client
        .delete(`/api/email/register/${domain}`)
        .then(this._fetchClients);
    } catch (e) {
      notification.error({
        message: `Unable to delete client ${domain}`,
        description: (e.response && e.response.data) || e.message,
      });
    }
  };

  _fetchNumPendingEmails = async domain => {
    try {
      const response = await this._client.get(
        `/api/email/metrics/pending/${domain}`
      );
      return response.data.pending_emails;
    } catch (e) {
      notification.error({
        message: `Unable to fetch pending emails for client ${domain}`,
        description: (e.response && e.response.data) || e.message,
      });
      return null;
    }
  };

  _renderListItem = ({ domain }) => {
    return (
      <List.Item key={domain}>
        <ClientCard
          domain={domain}
          onDelete={this._deleteClient}
          fetchNumPendingEmails={this._fetchNumPendingEmails}
        />
      </List.Item>
    );
  };

  componentDidMount() {
    if (this._isEnabled) {
      this._fetchClients();
    }
  }

  render() {
    const { isLoading, clients } = this.state;

    if (!this._isEnabled) {
      return (
        <Empty description="Add Github access token in settings to view clients." />
      );
    }

    return (
      <Grid
        loading={isLoading}
        dataSource={clients}
        renderItem={this._renderListItem}
      />
    );
  }
}

export default ClientStats;
