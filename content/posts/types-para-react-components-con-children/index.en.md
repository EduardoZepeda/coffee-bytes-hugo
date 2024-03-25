---
title: "Types for React components with children"
date: "2021-10-19"
categories:
- "javascript"
- "react"
- "typescript"

coverImage: "images/TypesChildrenTypescript.jpg"
coverImageCredits: "Credits to https://www.pexels.com/@tranmautritam/"
description: "Three different ways to set types in typescript for components that receive children as a parameter in React."
keywords:
- "react"
- "typescript"
- "javascript"

authors:
- Eduardo Zepeda
---

Typescript requires that we specify the types for the different variables and function arguments in React. When they are native types it is not intrincate, but for React components it can be different. Here are 3 ways to specify types for React components that contain children as part of their props.

## Types With ReactNode

The easiest way is manually, by specifying children as an optional React node.

```javascript
import React from 'react'

type props = {
    children?: React.ReactNode
}

const MyComponent = ({ children }: Props) => {
    return (
        <div>
            {children}      
        </div>
    )
}

export default MyComponent
```

## Using React.FC

The second way is to use a FC (Functional Component) object provided by React, which leaves implicit the use of children and also prevents us from returning undefined. Consider that using _React.FC_ is [considered by some developers as a bad practice](/en/why-using-react-fc-could-be-a-bad-practice/).

```javascript
import React from 'react'

const MyComponent: React.FC<{}> = ({ children }) => {
    return (
        <div>
            {children}      
        </div>
    )
}

export default MyComponent
```

## React.PropsWithChildren

The last way is to make use of the PropsWithChildren object provided by React which, as its name says, already includes the props with the children component, ready to be used directly.

```javascript
import React from 'react'

type Props = React.PropsWithChildren<{}>

const MyComponent = ({ children }: Props) => {
    return (
        <div>
            {children}      
        </div>
    )
}

export default MyComponent
```

See what Typescript has to say on React at [their official documentation](https://www.typescriptlang.org/docs/handbook/jsx.html#react-integration)