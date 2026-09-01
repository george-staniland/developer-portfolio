type StructuredTextValue = {
  schema: 'dast';
  document: {
    type: 'root';
    children: unknown[];
  };
};

export type Project = {
  id: string;
  projectTitle: string | null;
  myRole: string | null;
  studioCompletedAt: string | null;
  websiteLink: string | null;
  projectWriteUp: { value: StructuredTextValue } | null;
  accordion: {
    rowTitle: string | null;
    rowContent: { value: StructuredTextValue } | null;
  }[];
  techIcons: {
    title: string | null;
    reactIconMarkup: string | null;
  }[];
  brandColour: { hex: string } | null;
  _status: 'draft' | 'published' | 'updated';
  _firstPublishedAt: string | null;
};

export type GetProjectsQuery = {
  allProjects: Project[];
  _allProjectsMeta: {
    count: number;
  };
};

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

export const GET_JOB_APPLICATIONS = `
{
   allApplicationPages {
    id
    jobRoleTitle
    paragraph
    applicationVideo {
      url
    }
  }
}`


export const GET_APPLICATION = `
  query TestBla ($slug : String!) {
    applicationPage (filter:{ slug:{ eq: $slug }  } ) {
      id
      jobRoleTitle
      companyName
      paragraph
      applicationVideo {
        url
      }
    }
  }
`