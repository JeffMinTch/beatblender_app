export const config = {
  webApi: {
    baseUrl: 'http://localhost:9090/api/web',
    audioPath: {
      public: {
        root: '/public/audio',
        samplesHome: '/samples-home',
        tracksHome: '/tracks-home',
        findByString: '/find-by-string',
        searchSingleAudio: '/search-single-audio',
        searchMusicByInput: '/searchMusicByInput',
        filterSamples: '/filter-samples',
        filterTracks: '/filter-tracks',
        getSample: '/get-sample',
        artistHome: '/artists-home'

      },
      protected: {
        root: '/protected/audio',
        uploadSamples: '/upload-samples',
        registerTrack: '/register-track',
        getUploads: '/get-uploads',
        getReleases: '/get-releases',
        updateTitle: '/update-title',
        updateGenre: '/update-genre',
        updateTempo: '/update-tempo',
        updateMoods: '/update-moods',
        updateTags: '/update-tags',
        getSampleFromArtist: '/get-samples-from-artist'
      }
    },
    userPath: {
      public: {
        root: '/public/user'
      },
      protected: {
        root: '/protected/user',
        userData: '/user-data',
        setArtistImage: '/set-artist-image',
        setArtistName: '/set-artist-name',
        tryCreateUser: '/try-create-user',
      }
    },
    licensePath: {
      public: {
        root: '/public/license'
      },
      protected: {
        root: '/protected/license',
        fullLicense: {
          root: '/full-license',
          getFullLicenses: '/get-full-licenses',
          upgradeFullLicense: '/withdraw-extension-option'
        },
        basicLicense: {
          root: '/basic-license',
          getBasicLicense: '/get-basic-license',
          getAll: '/get-all',
          getAllTracks: '/get-all-tracks',
          getAllUnextendedTracks: '/get-all-unextended-tracks'
        }
      }
    },
    mediaPath: {
      public: {
        root: '/public/media',
        audio: '/audio',
        image: '/image'
      },
      protected: {
        root: '/protected/media',
        getAudioFile: '/get-audio-file',
        getBasicLicenseFile: '/get-basic-license-file',
        getFullLicenseFile: '/get-full-license-file'
      }
    }

  },
  auth: {
    clientId: 'tynk4TSRQwaXWMi8u8TfOzFRY6eJRSHd',
    domain: 'dev-zf2bf0ly.eu.auth0.com',
    audience: 'https://beatblender.com',
    
  },
  // auth0: {
  //   domain: '${process.env['AUTH0_DOMAIN']}',
  //   clientId: '${process.env['AUTH0_CLIENT_ID']}',
  //   redirectUri: '${process.env['AUTH0_CALLBACK_URL']}',
  //   audience: '${process.env['AUTH0_AUDIENCE']}',
  //   errorPath: '/callback',
  // },
  // api: {
  //   serverUrl: '${process.env['API_SERVER_URL']}',
  // },
  
  authRoles: {
    // sa: ['SA'], // Only Super Admin has access
    // admin: ['SA', 'Admin'], // Only SA & Admin has access
    // editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    // user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    // guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has 
    superAdmin: ['app-super-admin', 'app-admin', 'app-mitarbeiter', 'app-user', 'app-business-user', 'offline_access', 'uma_authorization'],
    admin: ['app-admin', 'app-mitarbeiter', 'app-business-user', 'app-user', 'offline_access', 'uma_authorization'],
    mitarbeiter: ['app-mitarbeiter', 'app-user', 'app-business-user', 'offline_access', 'uma_authorization'],
    business_user: ['app-business-user', 'offline_access', 'uma_authorization'],
    user: ['app-user', 'offline_access', 'uma_authorization']
  }
}
