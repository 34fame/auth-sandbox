const routes = [
   {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
         { name: 'home', path: '', component: () => import('pages/Index.vue') },
         { name: 'auth_callback', path: 'auth_callback', component: () => import('pages/AuthCallback.vue') },
         { name: 'logout', path: 'logout', component: () => import('pages/Logout.vue') },
      ],
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '*',
      component: () => import('pages/Error404.vue'),
   },
]

export default routes
