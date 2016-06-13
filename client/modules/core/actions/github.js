export default {
  getMyGists({Meteor, LocalState}) {
    if (!Meteor.user()) {
      return;
    }

    const fetching = 'FETCHING_MY_GISTS';

    if (LocalState.get(fetching) === true) {
      console.log('Already fetching user\'s gists. Please wait...'); // XXX
      return;
    }

    LocalState.set(fetching, true);

    Meteor.call('github.gists.get', 'my', (err, result) => {
      LocalState.set(fetching, false);
      if (!err) {
        console.log('SUCCESS', result); // XXX
      }
    });
  },

  getStarredGists({Meteor, LocalState}) {
    if (!Meteor.user()) {
      return;
    }

    const fetching = 'FETCHING_STARRED_GISTS';

    if (LocalState.get(fetching) === true) {
      console.log('Already fetching starred gists. Please wait...'); // XXX
      return;
    }

    LocalState.set(fetching, true);

    Meteor.call('github.gists.get', 'starred', (err, result) => {
      LocalState.set(fetching, false);
      if (!err) {
        console.log('SUCCESS', result); // XXX
      }
    });
  },

  fetchGists({Meteor, LocalState}) {
    if (!Meteor.user()) {
      return;
    }

    const fStarred = 'FETCHING_STARRED_GISTS';
    const fMy = 'FETCHING_MY_GISTS';

    if (LocalState.get(fStarred) || LocalState.get(fMy)) {
      console.log('Already requesting GISTS. Please wait...'); // XXX
      return;
    }

    LocalState.set(fStarred, true);
    LocalState.set(fMy, true);

    Meteor.call('github.gists.fetch', (err, result) => {
      LocalState.set(fStarred, false);
      LocalState.set(fMy, false);

      if (err) {
        console.error(err); // XXX
      } else {
        console.log('SUCCESS', result); // XXX
      }
    });
  },

  togglePublicFilter({LocalState}) {
    LocalState.set('GISTS_FILTER_PUBLIC', !LocalState.get('GISTS_FILTER_PUBLIC'));
  },

  togglePrivateFilter({LocalState}) {
    LocalState.set('GISTS_FILTER_PRIVATE', !LocalState.get('GISTS_FILTER_PRIVATE'));
  },

  toggleStarredFilter({LocalState}) {
    LocalState.set('GISTS_FILTER_STARRED', !LocalState.get('GISTS_FILTER_STARRED'));
  },

  toggleOwnedFilter({LocalState, Meteor, _}) {
    let username = _.property('services.github.username')(Meteor.user());
    LocalState.set('GISTS_FILTER_OWNED', !LocalState.get('GISTS_FILTER_OWNED') ? username : false);
  },

  toggleStar({LocalState, Meteor}, id) {
    console.log(id); // XXX
    throw new Error('Not implemented');
  },

  editGist({LocalState}) {
    console.log('EDIT MODE ON'); // XXX
    LocalState.set('EDIT_MODE', true);
  },

  saveGist({LocalState}) {
    console.log('EDIT MODE OFF'); // XXX
    LocalState.set('EDIT_MODE', false);
  },

  togglePublic({LocalState, Meteor}, gist) {
    console.log(gist); // XXX
    throw new Error('Not implemented');
  },

  deleteGist({LocalState, Meteor}, gist) {
    console.log(gist); // XXX
    throw new Error('Not implemented');
  }

};
