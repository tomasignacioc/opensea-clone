import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'yxao2lvw',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: '',
    useCdn: false,
})