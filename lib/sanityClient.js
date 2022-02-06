import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'yxao2lvw',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skedhhWuaICsIiZ8KIjWSH2vNdjs2PfvST0jW4OQTjKpJHptsZJciSaloqYVV4F1QOjfZ8fQxn3etH5WQjyuBNdHwvAZbyGXXD8I1dsKWilUYDVHIctT1JVHtOrniVPUJIlSLB8fHE1p0rEkMPNKQlPlbXsbG3xe82FIyJBlrjkiCQHCxIq1',
    useCdn: false,
})