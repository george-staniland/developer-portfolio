export const GET_PROJECTS = ` 
{
  allProjects {
    id
    projectTitle
    myRole
    studioCompletedAt
    websiteLink
    projectWriteUp {
      value
    }
    accordion {
      rowTitle
      rowContent {
        value
			}
    }
    techIcons {
      title
      reactIconMarkup
    }
    brandColour {
      hex
    }
    websiteLink
    _status
    _firstPublishedAt
  }
  _allProjectsMeta {
    count
  }
}
`;