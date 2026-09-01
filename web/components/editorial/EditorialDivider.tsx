export function EditorialDivider({value}: {value?: {intent?: string}}) {
  return <hr className="editorial-divider" data-intent={value?.intent || 'scene'} />
}
