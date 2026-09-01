export const MOODS = [
  {title: 'Documentary', value: 'documentary'},
  {title: 'Quiet', value: 'quiet'},
  {title: 'Archive', value: 'archive'},
  {title: 'Cinematic', value: 'cinematic'},
  {title: 'Minimal', value: 'minimal'},
] as const

export const STORY_TYPES = [
  {title: 'Feature', value: 'feature'},
  {title: 'Essay', value: 'essay'},
  {title: 'Field Note', value: 'fieldNote'},
] as const

export const RIGHTS = [
  {title: 'Unknown / not yet cleared', value: 'unknown'},
  {title: 'Placeholder — editorial demo only', value: 'placeholder'},
  {title: 'All rights reserved', value: 'all-rights-reserved'},
  {title: 'Licensed for this publication', value: 'licensed'},
  {title: 'Creative Commons', value: 'creative-commons'},
  {title: 'Public domain', value: 'public-domain'},
  {title: 'Fair use claimed (must be reviewed)', value: 'fair-use-claimed'},
] as const

export const PROVENANCE = [
  {title: 'Verified', value: 'verified'},
  {title: 'Placeholder', value: 'placeholder'},
  {title: 'Unverified', value: 'unverified'},
] as const

export const STORY_GROUPS = [
  {name: 'story', title: 'Story', default: true},
  {name: 'body', title: 'Body'},
  {name: 'relations', title: 'Relations'},
  {name: 'sources', title: 'Sources'},
  {name: 'publishing', title: 'Publishing'},
  {name: 'seo', title: 'SEO & Advanced'},
]
