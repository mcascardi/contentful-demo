import { createClient } from 'contentful';

export const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export interface BlogPost {
    title: string;
    slug: string;
    body: string;
    publishDate: string;
}

export async function getAllPosts() : Promise<BlogPost[]> {
    const response = await contentfulClient.getEntries ({
        content_type: 'blogPost'
    })

    return response.items.map( ( item: any) =>  ( {
        title: item.fields.title,
        slug: item.fields.slug,
        body: item.fields.body,
        publishDate: item.fields.publishDate
    }))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const response = await contentfulClient.getEntries( {
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1

    })

    if (response.items.length === 0 ) return null;

    const item = response.items[0];
    return {
        title: item.fields.title,
        slug: item.fields.slug,
        body: item.fields.body,
        publishDate: item.fields.publishDate,
    }
}
