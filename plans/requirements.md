# Requirements

## Stakeholders and Roles

- **The users**: Users access the website to learn about the non-profit foundation, and see recent news and updates. Some of the users are mandarin speakers who resides in Taiwan, others are international users who are fluent only in English.
- **The non-technical maintainer**: The non-technical maintainer does not have the technical skillset to read and modify code. They are able to edit and modify markdown files in-order to change the content of the website and post updates.
- **The technical maintainer**: I am the technical maintainer of this website, 

## High-level architecture requirements

- Static website generator from markdown files using React SSR
- Freemium hosting plan
- Freemium post-commit triggers to automatically deploy
- Do not require hosting a container or a vps
- I like tech such as bun, vercel, github pages, but these are not hard requirements, use them to figure out the appropriate architecture.

<TODO> After finishing the current todos, start populating `tech_choices.md` for me to review so you can plan out the actual `architecture.md` based on my key decisions.


## User requirement

<TODO> There is a current website here https://lhyymed.fund/ that we are trying to rebuild with a better architecture. Browse the website in details to figure out current requirements to populate the detailed list of user requirement in this section.

## The non-technical maintainer requirements

The non-technical maintainer will use github to update the content of the website by editing markdown files. To avoid them accidentally breaking the code, we will put all the markdown files in the main branch, and all the actual code in the source branch. This way, by default they can only see the markdown files.

Once a markdown file is edited and commited to the main branch, post-commit actions will be automatically triggered to regenerate the static webpage and deploy it.

<TODO> Key decision: !!! Verify this 2-branch approach above will play nicely with the hosting/deployment tech choices. If not, I am open to alternative suggestions.

## The technical maintainer requirements

Co-work with a coding agent to figure out the right architecture and implementation of this website. Once the website is developed, there should be minimal maintancance work required. Most changes should be self-serviced for the non-technical maintainer listed above.

<TODO-Future> Once we planned out more detailed architecture, update this section for the actual maintainance work for me to review and confirm that it is acceptable.


## SEO requirements

Follow the below SEO guidelines from google for best practices:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

<TODO-Future> Once the website is up and running, we will use the below mcp tool to conduct further SEO:
- https://github.com/AminForou/mcp-gsc
