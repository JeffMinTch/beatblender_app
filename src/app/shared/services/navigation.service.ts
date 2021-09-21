import { OnInit } from '@angular/core';
import { LayoutService } from 'app/shared/services/layout.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

export interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnInit {

  accountMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'My Account'
    },
    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'profile/overview'
    },

    // {
    //   name: 'My Licenses',
    //   type: 'dropDown',
    //   tooltip: 'My Licenses',
    //   icon: 'library_books',
    //   state: 'profile/my-licenses',
    //   sub: [
    //     { name: 'Basic Licenses', state: 'basic-licenses', type: 'link' },
    //     { name: 'Extended Licenses', state: 'extended-licenses', type: 'link' },
    //   ]
    // },
    {
      name: 'Sample Download Area',
      type: 'link',
      tooltip: 'My Licenses',
      icon: 'library_books',
      state: 'profile/my-licenses/basic-licenses'
      // sub: [
      //   { name: 'Basic Licenses', state: 'basic-licenses', type: 'link' },
      //   { name: 'Extended Licenses', state: 'extended-licenses', type: 'link' },
      // ]
    },
    {
      name: 'My Releases',
      type: 'link',
      tooltip: 'My Releases',
      icon: 'album',
      state: 'profile/my-releases'
      // sub: [
      //   { name: 'Basic Licenses', state: 'basic-licenses', type: 'link' },
      //   { name: 'Extended Licenses', state: 'extended-licenses', type: 'link' },
      // ]
    },
    // {
    //   name: 'Manage Audio',
    //   type: 'dropDown',
    //   tooltip: 'Upload Audio',
    //   icon: 'upload',
    //   state: 'profile',
    //   sub: [
    //     { name: 'Upload Sample', state: 'upload-audio', type: 'link' },
    //     { name: 'My Uploads', state: 'manage-audio', type: 'link' },
    //   ]
    // },
    {
      name: 'Upload Sample to Markets',
      type: 'link',
      tooltip: 'Upload Sample',
      icon: 'upload',
      state: 'profile/upload-audio',
      // sub: [
      //   { name: 'Upload Sample', state: 'upload-audio', type: 'link' },
      //   { name: 'My Uploads', state: 'manage-audio', type: 'link' },
      // ]
    },
    // {
    //   name: 'Manage your Uploads',
    //   type: 'link',
    //   tooltip: 'Manage your Uploads',
    //   icon: 'upload',
    //   state: 'profile/manage-audio',
    //   // sub: [
    //   //   { name: 'Upload Sample', state: 'upload-audio', type: 'link' },
    //   //   { name: 'My Uploads', state: 'manage-audio', type: 'link' },
    //   // ]
    // },
    // {
    //   name: 'Collaborations',
    //   type: 'link',
    //   tooltip: 'Collaborations',
    //   icon: 'queue_music',
    //   state: 'profile/collaborations'
    // },
    // {
    //   name: 'Distribute your sampled Track',
    //   type: 'link',
    //   tooltip: 'Distribute',
    //   icon: 'public',
    //   state: 'profile/distribute'
    // },
    // {
    //   name: 'Manage your Finances',
    //   type: 'link',
    //   tooltip: 'Finances',
    //   icon: 'account_balance_wallet',
    //   state: 'profile/finances'
    // },
    {
      name: 'Settings',
      type: 'link',
      tooltip: 'Settings',
      icon: 'settings',
      state: 'profile/settings'
    },

  ];

  listenMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Listen Music'
    },
    {
      name: 'All Music',
      type: 'link',
      tooltip: 'All Music',
      icon: 'headphones',
      state: 'listen/all-music'
    },
    {
      name: 'Find',
      type: 'link',
      tooltip: 'Find',
      icon: 'search',
      state: 'listen/find'
    },
    {
      name: 'Genres',
      type: 'link',
      tooltip: 'Documentation',
      icon: 'library_books',
      state: 'listen/genres'
    },
    {
      name: 'Playlists',
      type: 'link',
      tooltip: 'Playlists',
      icon: 'queue_music',
      state: 'listen/playlists'
    },
  ];



  sampleMarketMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Sample Market'
    },
    // {
    //   name: 'How It Works',
    //   type: 'dropDown',
    //   tooltip: 'Documentation',
    //   icon: 'info',
    //   state: 'sample-market/docs',
    //   sub: [
    //     { name: 'Introduction', state: 'introduction', type: 'link' },
    //     { name: 'What is Root Sounds', state: 'learning-management', type: 'link' },
    //     { name: 'How To Get A License', state: 'analytics', type: 'link' },
    //     { name: 'Sampling Rules', state: 'crypto', type: 'link' },
    //     { name: 'Video Tutorials', state: 'dark', type: 'link' },
    //     { name: 'FAQ', state: 'dark' }

    //   ]
    // },
    {
      name: 'Find All',
      type: 'link',
      icon: 'storefront',
      state: 'sample-market/find-all'
    },
    // {
    //   name: 'License A', state: 'sample-market', type: 'dropDown', icon: 'storefront', sub: [
    //     { name: 'License A1', state: 'bb-a1', type: 'link' },
    //     { name: 'License A2', state: 'bb-a2', type: 'link' },
    //   ]
    // },
    // {
    //   name: 'License B', state: 'sample-market', type: 'dropDown', icon: 'storefront', sub: [
    //     { name: 'License B1', state: 'bb-b1', type: 'link' },
    //     { name: 'License B2', state: 'bb-b2', type: 'link' },

    //     // { name: 'Sampling Rules', state: 'crypto', type: 'link' },
    //     // { name: 'Video Tutorials', state: 'dark', type: 'link' },
    //     // { name: 'FAQ', state: 'dark' }

    //   ]
    // },
    // {
    //   name: 'License C', state: 'sample-market', icon: 'storefront', type: 'dropDown', sub: [
    //     { name: 'License C1', state: 'bb-c1', type: 'link' },
    //     { name: 'License C2', state: 'bb-c2', type: 'link' },

    //     // { name: 'Sampling Rules', state: 'crypto', type: 'link' },
    //     // { name: 'Video Tutorials', state: 'dark', type: 'link' },
    //     // { name: 'FAQ', state: 'dark' }

    //   ]
    // },

    // {
    //   name: 'Sample Markets',
    //   type: 'dropDown',
    //   tooltip: 'Sample Markets',
    //   icon: 'info',
    //   state: 'sample-market',
    //   sub: [
    //     {
    //       name: 'License Deed',
    //       type: 'link',
    //       icon: 'storefront',
    //       state: 'license-deeds'
    //     },
    //     {
    //       name: 'License A', state: '', type: 'dropDown', sub: [
    //         { name: 'License A1', state: 'bb-a1', type: 'link' },
    //         { name: 'License A2', state: 'bb-a2', type: 'link' },
    //       ]
    //     },
    //     {
    //       name: 'License B', state: '', type: 'dropDown', sub: [
    //         { name: 'License B1', state: 'bb-b1', type: 'link' },
    //         { name: 'License B2', state: 'bb-b2', type: 'link' },

    //         // { name: 'Sampling Rules', state: 'crypto', type: 'link' },
    //         // { name: 'Video Tutorials', state: 'dark', type: 'link' },
    //         // { name: 'FAQ', state: 'dark' }

    //       ]
    //     },
    //     {
    //       name: 'License C', state: '', type: 'dropDown', sub: [
    //         { name: 'License C1', state: 'bb-c1', type: 'link' },
    //         { name: 'License C2', state: 'bb-c2', type: 'link' },

    //         // { name: 'Sampling Rules', state: 'crypto', type: 'link' },
    //         // { name: 'Video Tutorials', state: 'dark', type: 'link' },
    //         // { name: 'FAQ', state: 'dark' }

    //       ]
    //     },

    //   ]
    // },

    // {
    //   name: 'Sample Market',
    //   type: 'link',
    //   tooltip: 'Sample Market',
    //   icon: 'storefront',
    //   state: 'sample-market'
    // },
  ];

  aboutMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'About'
    },
    // {
    //   name: 'About',
    //   type: 'link',
    //   tooltip: 'About',
    //   icon: 'info',
    //   state: 'about'
    // },
    // {
    //   name: 'FAQ',
    //   type: 'link',
    //   tooltip: 'About',
    //   icon: 'question_answer',
    //   state: 'about/faq',
    //   sub: [
    //   ]
    // },

    { name: 'About', state: 'about/introduction', type: 'link', icon: 'info' },
    { name: 'How To Get A License', state: 'about/how-to-get-a-license', type: 'link', icon: 'info' },
    { name: 'Sampling Rules', state: 'about/sampling-rules', type: 'link', icon: 'info' },
    { name: 'Video Tutorials', state: 'about/video-tutorials', type: 'link', icon: 'info' },
    { name: 'FAQ', state: 'about/faq' , type: 'link', icon: 'info'},
    { name: 'Our Partners', state: 'about/partners', type: 'link', icon: 'help' },
  ];

  licenseMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Licensing'
    },
    // {
    //   name: 'Licenses',
    //   type: 'dropDown',
    //   tooltip: 'Licenses',
    //   icon: 'assignment',
    //   state: 'licensing',
    //   sub: [
    //     { name: 'License Register', state: 'license-register', type: 'link' },
    //     { name: 'License Deeds', state: 'license-deeds' , type: 'link'},
    //   ]
    // },
    // {
    //   name: 'License Register',
    //   type: 'link',
    //   tooltip: 'License Register',
    //   icon: 'app_registration',
    //   state: 'licensing/license-register'
    // },
    // {
    //   name: 'Licenses',
    //   type: 'link',
    //   tooltip: 'Our Licenses',
    //   icon: 'app_registration',
    //   state: 'licensing/license-deeds',

    // },
    {
      name: 'How It Works',
      type: 'link',
      tooltip: 'How it works',
      icon: 'app_registration',
      state: 'licensing/how-to-distribute',

    },
    {
      name: 'Your Songs',
      type: 'link',
      tooltip: 'Our Licenses',
      icon: 'app_registration',
      state: 'licensing/register-track',

    },

  ];


  // {
  //   name: 'Upload',
  //   type: 'link',
  //   tooltip: 'Documentation',
  //   icon: 'library_books',
  //   state: 'licensing/forms/upload-audio'
  // },
  // {
  //   name: 'My Licenses',
  //   type: 'dropDown',
  //   tooltip: 'My Licenses',
  //   icon: 'library_books',
  //   state: 'licensing/my-licenses',
  //   sub: [
  //     { name: 'Basic Licenses', state: 'basic-licenses' },
  //     {name: 'Extended Licenses', state: 'extended-licenses'},
  //   ]
  // },

  iconMenu: IMenuItem[] = [
    {
      name: 'About',
      type: 'icon',
      tooltip: 'About',
      icon: 'info',
      state: 'about'
    },
    {
      name: 'SAMPLE MARKET',
      type: 'icon',
      tooltip: 'Sample Market',
      icon: 'storefront',
      state: 'sample-market'
    },
    {
      name: 'MUSIC',
      type: 'icon',
      tooltip: 'Listen Music',
      icon: 'headset',
      state: 'listen'
    },
    // {
      {
        name: 'Licensing',
        type: 'icon',
        tooltip: 'Licensing',
        icon: 'app_registration',
        state: 'licensing',
      },
      //   name: 'Collaborate with others',
      {
        name: 'HOME',
        type: 'icon',
        tooltip: 'Account',
        icon: 'person',
        state: 'profile'
      },
    //   type: 'icon',
    //   tooltip: 'Collaborate others',
    //   icon: 'group_work',
    //   state: 'home'
    // },



    // {
    // {
    //   name: 'Sample of the Day',
    //   type: 'icon',
    //   tooltip: 'Sample',
    //   icon: 'storefront',
    //   state: 'licensing/sample-market'
    // },
    {
      type: 'separator',
      name: 'Navigate'
    },
    {
      name: 'About',
      type: 'dropDown',
      tooltip: 'About',
      icon: 'info',
      state: 'about',
      sub: [
        { name: 'Introduction', state: 'introduction', type: 'link', icon: 'info' },
    { name: 'How To Get A License', state: 'how-to-get-a-license', type: 'link', icon: 'info' },
    { name: 'Sampling Rules', state: 'sampling-rules', type: 'link', icon: 'info' },
    { name: 'Video Tutorials', state: 'video-tutorials', type: 'link', icon: 'info' },
    { name: 'FAQ', state: 'faq' , type: 'link', icon: 'info'},
    { name: 'Our Partners', state: 'partners', type: 'link', icon: 'help' },
      ]
    },
    {
      name: 'Sample Market',
      type: 'dropDown',
      tooltip: 'Sample Market',
      icon: 'storefront',
      state: 'sample-market',
      sub: [
        {
          name: 'BB License',
          type: 'link',
          icon: 'storefront',
          state: 'bb-license'
        }
      ]
    },
    {
      name: 'Listen Music',
      type: 'dropDown',
      tooltip: 'Listen Music',
      icon: 'headset',
      state: 'listen',
      sub: [
        {
          name: 'All Music',
          type: 'link',
          // tooltip: 'All Music',
          icon: 'headphones',
          state: 'all-music'
        },
        {
          name: 'Find',
          type: 'link',
          // tooltip: 'Find',
          icon: 'search',
          state: 'find'
        },
        {
          name: 'Genres',
          type: 'link',
          // tooltip: 'Documentation',
          icon: 'library_books',
          state: 'genres'
        },
        {
          name: 'Playlists',
          type: 'link',
          // tooltip: 'Playlists',
          icon: 'queue_music',
          state: 'playlists'
        },
      ]
    },
    // {
      {
        name: 'Licensing',
        type: 'dropDown',
        tooltip: 'Licensing',
        icon: 'app_registration',
        state: '',
        sub: [
          {
            name: 'License Register',
            type: 'link',
            // tooltip: 'License Register',
            icon: 'app_registration',
            state: 'licensing/how-to-distribute'
          },
          {
            name: 'Licenses',
            type: 'link',
            // tooltip: 'Our Licenses',
            icon: 'app_registration',
            state: 'licensing/register-track',
      
          },
        ]
      },
      //   name: 'Collaborate with others',
      {
        name: 'Account',
        type: 'dropDown',
        tooltip: 'Account',
        icon: 'person',
        state: 'profile',
        sub: [
          {
            name: 'Dashboard',
            type: 'link',
            // tooltip: 'Dashboard',
            icon: 'dashboard',
            state: 'overview'
          },
      
          // {
          //   name: 'My Licenses',
          //   type: 'dropDown',
          //   tooltip: 'My Licenses',
          //   icon: 'library_books',
          //   state: 'profile/my-licenses',
          //   sub: [
          //     { name: 'Basic Licenses', state: 'basic-licenses', type: 'link' },
          //     { name: 'Extended Licenses', state: 'extended-licenses', type: 'link' },
          //   ]
          // },
          {
            name: 'Sample Download Area',
            type: 'link',
            // tooltip: 'My Licenses',
            icon: 'library_books',
            state: 'my-licenses/basic-licenses'
            // sub: [
            //   { name: 'Basic Licenses', state: 'basic-licenses', type: 'link' },
            //   { name: 'Extended Licenses', state: 'extended-licenses', type: 'link' },
            // ]
          },
          // {
          //   name: 'Manage Audio',
          //   type: 'dropDown',
          //   tooltip: 'Upload Audio',
          //   icon: 'upload',
          //   state: 'profile',
          //   sub: [
          //     { name: 'Upload Sample', state: 'upload-audio', type: 'link' },
          //     { name: 'My Uploads', state: 'manage-audio', type: 'link' },
          //   ]
          // },
          {
            name: 'Upload Sample to Markets',
            type: 'link',
            // tooltip: 'Upload Sample',
            icon: 'upload',
            state: 'upload-audio',
            // sub: [
            //   { name: 'Upload Sample', state: 'upload-audio', type: 'link' },
            //   { name: 'My Uploads', state: 'manage-audio', type: 'link' },
            // ]
          },
          // {
          //   name: 'Manage your Uploads',
          //   type: 'link',
          //   tooltip: 'Manage your Uploads',
          //   icon: 'upload',
          //   state: 'profile/manage-audio',
          //   // sub: [
          //   //   { name: 'Upload Sample', state: 'upload-audio', type: 'link' },
          //   //   { name: 'My Uploads', state: 'manage-audio', type: 'link' },
          //   // ]
          // },
          // {
          //   name: 'Collaborations',
          //   type: 'link',
          //   tooltip: 'Collaborations',
          //   icon: 'queue_music',
          //   state: 'profile/collaborations'
          // },
          // {
          //   name: 'Distribute your sampled Track',
          //   type: 'link',
          //   // tooltip: 'Distribute',
          //   icon: 'public',
          //   state: '',
          //   // sub: [
          //   //       { name: 'Basic Licenses', state: 'how-to-distribute', type: 'link' },
          //   //       { name: 'Extended Licenses', state: 'register-track', type: 'link' },
          //   //     ]
          // },
          // {
          //   name: 'Manage your Finances',
          //   type: 'link',
          //   // tooltip: 'Finances',
          //   icon: 'account_balance_wallet',
          //   state: 'finances'
          // },
          {
            name: 'Settings',
            type: 'link',
            // tooltip: 'Settings',
            icon: 'settings',
            state: 'settings'
          },
        ]
      },
    // {
    //   name: 'All Music',
    //   type: 'dropDown',
    //   tooltip: 'Dashboard',
    //   icon: 'music_note',
    //   state: 'dashboard',
    //   sub: [
    //     { name: 'Default', state: 'default', type: 'link' },
    //     { name: 'Learning Management', state: 'learning-management', type: 'link' },
    //     { name: 'Analytics', state: 'analytics', type: 'link' },
    //     { name: 'Cryptocurrency', state: 'crypto', type: 'link' },
    //     { name: 'Dark Cards', state: 'dark', type: 'link' }
    //   ]
    // },
    
    // {
    //   name: 'Upload Audio',
    //   type: 'dropDown',
    //   tooltip: 'Upload Audio',
    //   icon: 'publish',
    //   state: 'forms',
    //   sub: [
    //     { name: 'Upload Audio', state: 'upload-audio', type: 'link' }
    //   ]
    // },
    // {
    //   name: 'DOC',
    //   type: 'extLink',
    //   tooltip: 'Documentation',
    //   icon: 'library_books',
    //   state: 'http://demos.ui-lib.com/egret-doc/'
    // }
  ];

  separatorMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Custom components'
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard'
    },
    {
      name: 'INBOX',
      type: 'link',
      tooltip: 'Inbox',
      icon: 'inbox',
      state: 'inbox'
    },
    {
      name: 'CHAT',
      type: 'link',
      tooltip: 'Chat',
      icon: 'chat',
      state: 'chat'
    },
    {
      name: 'CRUD Table',
      type: 'link',
      tooltip: 'CRUD Table',
      icon: 'format_list_bulleted',
      state: 'cruds/ngx-table'
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      tooltip: 'Dialogs',
      icon: 'filter_none',
      state: 'dialogs',
      sub: [
        { name: 'CONFIRM', state: 'confirm', type: 'link' },
        { name: 'LOADER', state: 'loader', type: 'link' }
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile',
      sub: [
        { name: 'OVERVIEW', state: 'overview', type: 'link' },
        { name: 'SETTINGS', state: 'settings', type: 'link' },
        { name: 'BLANK', state: 'blank', type: 'link' }
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    {
      type: 'separator',
      name: 'Integrated components'
    },
    {
      name: 'CALENDAR',
      type: 'link',
      tooltip: 'Calendar',
      icon: 'date_range',
      state: 'calendar'
    },
    {
      name: 'MATERIAL',
      type: 'dropDown',
      tooltip: 'Material',
      icon: 'favorite',
      state: 'material',
      sub: [
        { name: 'BUTTONS', state: 'buttons' },
        { name: 'Button Toggle', state: 'button-toggle' },
        { name: 'Buttons Loading', state: 'loading-buttons' },
        { name: 'CARDS', state: 'cards' },
        { name: 'GRIDS', state: 'grids' },
        { name: 'LISTS', state: 'lists' },
        { name: 'MENU', state: 'menu' },
        { name: 'TABS', state: 'tabs' },
        { name: 'SELECT', state: 'select' },
        { name: 'RADIO', state: 'radio' },
        { name: 'AUTOCOMPLETE', state: 'autocomplete' },
        { name: 'SLIDER', state: 'slider' },
        { name: 'PROGRESS', state: 'progress' },
        { name: 'SNACKBAR', state: 'snackbar' }
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      tooltip: 'Forms',
      icon: 'description',
      state: 'forms',
      sub: [
        { name: 'BASIC', state: 'basic' },
        { name: 'EDITOR', state: 'editor' },
        { name: 'UPLOAD', state: 'upload' },
        { name: 'WIZARD', state: 'wizard' }
      ]
    },
    {
      name: 'TABLES',
      type: 'dropDown',
      tooltip: 'Tables',
      icon: 'format_line_spacing',
      state: 'tables',
      sub: [
        { name: 'FULLSCREEN', state: 'fullscreen' },
        { name: 'PAGING', state: 'paging' },
        { name: 'FILTER', state: 'filter' }
      ]
    },
    {
      name: 'MAP',
      type: 'link',
      tooltip: 'Map',
      icon: 'add_location',
      state: 'map'
    },
    {
      name: 'CHARTS',
      type: 'link',
      tooltip: 'Charts',
      icon: 'show_chart',
      state: 'charts'
    },
    {
      name: 'DND',
      type: 'link',
      tooltip: 'Drag and Drop',
      icon: 'adjust',
      state: 'dragndrop'
    },
    {
      type: 'separator',
      name: 'Other components'
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'view_carousel',
      state: 'sessions',
      sub: [
        { name: 'SIGNUP', state: 'signup' },
        { name: 'SIGNIN', state: 'signin' },
        { name: 'FORGOT', state: 'forgot-password' },
        { name: 'LOCKSCREEN', state: 'lockscreen' },
        { name: 'NOTFOUND', state: '404' },
        { name: 'ERROR', state: 'error' }
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      state: 'others',
      sub: [
        { name: 'GALLERY', state: 'gallery' },
        { name: 'PRICINGS', state: 'pricing' },
        { name: 'USERS', state: 'users' },
        { name: 'BLANK', state: 'blank' }
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      tooltip: 'Material Icons',
      icon: 'store',
      state: 'icons'
    },
    {
      name: 'DOC',
      type: 'extLink',
      tooltip: 'Documentation',
      icon: 'library_books',
      state: 'http://demos.ui-lib.com/egret-doc/'
    }
  ];

  plainMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard'
    },
    {
      name: 'INBOX',
      type: 'link',
      tooltip: 'Inbox',
      icon: 'inbox',
      state: 'inbox'
    },
    {
      name: 'CHAT',
      type: 'link',
      tooltip: 'Chat',
      icon: 'chat',
      state: 'chat'
    },
    {
      name: 'CRUD Table',
      type: 'link',
      tooltip: 'CRUD Table',
      icon: 'format_list_bulleted',
      state: 'cruds/ngx-table'
    },
    {
      name: 'CALENDAR',
      type: 'link',
      tooltip: 'Calendar',
      icon: 'date_range',
      state: 'calendar'
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      tooltip: 'Dialogs',
      icon: 'filter_none',
      state: 'dialogs',
      sub: [
        { name: 'CONFIRM', state: 'confirm' },
        { name: 'LOADER', state: 'loader' }
      ]
    },
    {
      name: 'MATERIAL',
      type: 'dropDown',
      icon: 'favorite',
      state: 'component',
      sub: [
        { name: 'BUTTONS', state: 'buttons' },
        { name: 'Button Toggle', state: 'button-toggle' },
        { name: 'Buttons Loading', state: 'loading-buttons' },
        { name: 'CARDS', state: 'cards' },
        { name: 'GRIDS', state: 'grids' },
        { name: 'LISTS', state: 'lists' },
        { name: 'MENU', state: 'menu' },
        { name: 'TABS', state: 'tabs' },
        { name: 'SELECT', state: 'select' },
        { name: 'RADIO', state: 'radio' },
        { name: 'AUTOCOMPLETE', state: 'autocomplete' },
        { name: 'SLIDER', state: 'slider' },
        { name: 'PROGRESS', state: 'progress' },
        { name: 'SNACKBAR', state: 'snackbar' }
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      tooltip: 'Forms',
      icon: 'description',
      state: 'forms',
      sub: [
        { name: 'BASIC', state: 'basic' },
        { name: 'EDITOR', state: 'editor' },
        { name: 'UPLOAD', state: 'upload' },
        { name: 'WIZARD', state: 'wizard' }
      ]
    },
    {
      name: 'TABLES',
      type: 'dropDown',
      tooltip: 'Tables',
      icon: 'format_line_spacing',
      state: 'tables',
      sub: [
        { name: 'FULLSCREEN', state: 'fullscreen' },
        { name: 'PAGING', state: 'paging' },
        { name: 'FILTER', state: 'filter' }
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile',
      sub: [
        { name: 'OVERVIEW', state: 'overview' },
        { name: 'SETTINGS', state: 'settings' },
        { name: 'BLANK', state: 'blank' }
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    {
      name: 'MAP',
      type: 'link',
      tooltip: 'Map',
      icon: 'add_location',
      state: 'map'
    },
    {
      name: 'CHARTS',
      type: 'link',
      tooltip: 'Charts',
      icon: 'show_chart',
      state: 'charts'
    },
    {
      name: 'DND',
      type: 'link',
      tooltip: 'Drag and Drop',
      icon: 'adjust',
      state: 'dragndrop'
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'view_carousel',
      state: 'sessions',
      sub: [
        { name: 'SIGNUP', state: 'signup' },
        { name: 'SIGNIN', state: 'signin' },
        { name: 'FORGOT', state: 'forgot-password' },
        { name: 'LOCKSCREEN', state: 'lockscreen' },
        { name: 'NOTFOUND', state: '404' },
        { name: 'ERROR', state: 'error' }
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      state: 'others',
      sub: [
        { name: 'GALLERY', state: 'gallery' },
        { name: 'PRICINGS', state: 'pricing' },
        { name: 'USERS', state: 'users' },
        { name: 'BLANK', state: 'blank' }
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      tooltip: 'Material Icons',
      icon: 'store',
      state: 'icons'
    },
    {
      name: 'DOC',
      type: 'extLink',
      tooltip: 'Documentation',
      icon: 'library_books',
      state: 'http://demos.ui-lib.com/egret-doc/'
    }
  ];


  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  // this.iconMenu

  quickAccessItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  quickAccessItems$ = this.quickAccessItems.asObservable();
  menuItems: ReplaySubject<IMenuItem[]> = new ReplaySubject();
  menuItems$: Observable<IMenuItem[]> = this.menuItems.asObservable();

  constructor(
    // private layoutService: LayoutService
  ) {
    // this.menuItems  = new BehaviorSubject<IMenuItem[]>(this.sampleMarketMenu);
    // this.menuItems$ = this.menuItems.asObservable();
  }

  ngOnInit(): void {
    console.log('navigationservice');
    // this.layoutService.layoutConf$.subscribe((layoutConf) => {
    //   this.publishNavigationChange(layoutConf.sidenavMenu);
    // });
  }



  // navigation component has subscribed to this Observable

  // sampleMarketItems = new BehaviorSubject<IMenuItem[]>(this.sampleMarketMenu);
  // sampleMarketItems$ = this.sampleMarketItems.asObservable();

  // listenItems = new BehaviorSubject<IMenuItem[]>(this.listenMenu);
  // listenItems$ = this.listenItems.asObservable();

  // accountItems = new BehaviorSubject<IMenuItem[]>(this.accountMenu);
  // accountItems$ = this.accountItems.asObservable();



  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      case 'sample-market-menu':
        // console.log(this.sampleMarketMenu);
        this.menuItems.next(this.sampleMarketMenu);
        break;
      case 'listen-menu':
        this.menuItems.next(this.listenMenu);
        break;
      case 'account-menu':
        this.menuItems.next(this.accountMenu);
        break;
      case 'about-menu':
        this.menuItems.next(this.aboutMenu);
        break;
      case 'license-menu':
        this.menuItems.next(this.licenseMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}
