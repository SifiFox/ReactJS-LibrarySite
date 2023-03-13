export function modifyStr(str, match) {
  return str.replace(`<span class='hint_light'>${match}</span>`, `<span class="error_span">${match}</span>`);
}

export function replacedString(str, localMatches) {
  let newStr = str;
  console.log(localMatches);

  if (localMatches.email) {
    return (
      <p
        data-test-id='hint'
        className='hint'
        dangerouslySetInnerHTML={{ __html: `<span class="error_span">${localMatches.email}</span>` }}
      />
    );
  }
  if (localMatches.optionality) {
    return (
      <p
        data-test-id='hint'
        className='hint'
        dangerouslySetInnerHTML={{ __html: `<span class="error_span">${localMatches.optionality}</span>` }}
      />
    );
  }
  if (localMatches.required) {
    console.log(localMatches.required);
    return (
      <span
        data-test-id='hint'
        className='error_span'
        dangerouslySetInnerHTML={{ __html: `${localMatches.required}` }}
      />
    );
  }
  if (typeof localMatches.matches !== 'string') {
    localMatches.matches.forEach((match) => {
      newStr = modifyStr(newStr, match);
    });
    return <p data-test-id='hint' className='hint' dangerouslySetInnerHTML={{ __html: newStr }} />;
  }
  // const res = str.replace(localMatches.matches, `<span class="error_span">${localMatches.matches}</span>`);
  const res = str.replace(
    `<span class='hint_light'>${localMatches.matches}</span>`,
    `<span class="error_span">${localMatches.matches}</span>`
  );

  console.log(res);
  return <span data-test-id='hint' className='hint' dangerouslySetInnerHTML={{ __html: res }} />;
}
