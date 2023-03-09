export function modifyStr(str, match) {
  return str.replace(match, `<b>${match}</b>`);
}

export function replacedString(str, localMatches) {
  console.log(localMatches);
  let newStr = str;

  if (localMatches.email) {
    return <span className='hint' dangerouslySetInnerHTML={{ __html: `<b>${localMatches.email}</b>` }} />;
  }
  if (localMatches.optionality) {
    return <span className='hint' dangerouslySetInnerHTML={{ __html: `<b>${localMatches.optionality}</b>` }} />;
  }
  if (localMatches.required) {
    console.log(localMatches.required);
    return <span className='hint' dangerouslySetInnerHTML={{ __html: `<b>${localMatches.required}</b>` }} />;
  }
  if (typeof localMatches.matches !== 'string') {
    localMatches.matches.forEach((match) => {
      newStr = modifyStr(newStr, match);
    });
    return <span className='hint' dangerouslySetInnerHTML={{ __html: newStr }} />;
  }
  const res = str.replace(localMatches.matches, `<b>${localMatches.matches}</b>`);
  return <span className='hint' dangerouslySetInnerHTML={{ __html: res }} />;
}
