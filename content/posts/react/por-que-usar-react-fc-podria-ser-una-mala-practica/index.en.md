---
aliases:
- /en/why-using-reactfc-could-be-a-bad-practice/
- /en/why-using-react.fc-could-be-a-bad-practice/
authors:
- Eduardo Zepeda
categories:
- react
- opinion
coverImage: images/react-fc-mala-practica.jpg
date: '2022-02-23'
description: Using React.FC could be a bad practice and go against the explicit nature
  of Typescript due to its ambiguous way of dealing with children, of course is not
  the only way, there are better ways to deal with React components that have children.
keywords:
- react
- typescript
- javascript
- opinion
title: Why using React.FC could be a bad practice?
---

When we use Typescript with React and we want to [pass a children as prop to one of our components](/en/react/what-types-to-use-for-react-components-with-children/), we need to indicate the type. Generally we use the type _React.FC_, which is short for _React.FunctionComponent_. With this the Typescript message warning us of a children with type any will disappear.

```jsx
const Component: React.FC = ({ children }) => {
    return (<div>{children}</div>)
}
```

In addition to allowing us to work with children, _React.FC_ also causes an error if we try to return _undefined_ from our component.

```jsx
const Component: React.FC = ({ children }) => {
    // Type '() => undefined' can't be assigned to type 'FC<{}>'.
    return undefined
}

export default Component
```

As you can see, *React.FC* is quite comfortable to use, but some people do not agree with its use.

## React.FC, more disadvantages than advantages?

What's the problem? Well, some developers claim that _React.FC_ can bring more disadvantages than advantages, there is even a discussion on github (link at the end), in which it is debated whether it is convenient to remove one of the examples in the documentation that uses it.

The user who started this discussion believes that **the fact that _React.FC_ is so popular is because its presence in the documentation positions it as the default way to handle React components with Typescript.**

Here are some of the reasons why React.FC may have more disadvantages than advantages.

### React.FC does not warn us about unused children

_React.FC_ is not always the most explicit way to tell typescript that a component receives _children_ as part of its props.

Imagine that we pass a children to the component, but we don't use it.

```jsx
import Component from './Component';

function App() {
  return (
    <Component>I'm the children component</Component>
  );
}

export default App;
```

Our component does receive the _children_ as a prop, but the _React.FC_ type appeases Typescript and prevents it from returning an error, even if we are not using it.

```jsx
const Component: React.FC = () => {
    return (
        <div>I'm not the children which receives the component</div>
    )
}

export default Component
```

Or, for an opposite case; imagine that we do not want our component to receive a children as one of its props, however, as we are using _React.FC_ we will not get any error.

```javascript
import Component from './Component';

function App() {
  return (
    <Component><div>I shouldn't be here</div></Component>
  );
}

export default App;
```

### Subcomponent pattern in React gets more complicated using React.FC

The [component pattern as namespace](https://medium.com/@kunukn_95852/react-components-with-namespace-f3d169feaf91) is fairly simple to create without using *React.FC*, but with *React.FC* it can get quite complicated.

Don't know what it is? Think of a pattern that allows you to group components within a certain parent, which functions as a namespace for our child components; similar to how the C++ namespace _std_ would work.

```jsx
<Namespace>
    <Namespace.Component />
</Namespace>
```

In its simplest form, omitting *React.FC* would look something like this:

```jsx
const Namespace = (props: NamespaceProps) => {/* ... */}
Namespace.Component = (props: ComponentProps) => { /*...*/ }
```

But if we choose to use React.FC the code would become more complicated and the readability would decrease a bit.

```jsx
const Namespace: React.FC<NamespaceProps> & { Component: React.FC<ComponentProps> } = (props) => {/* ... */ }
Namespace.Component = (props) => { /*...*/ }
```

{{<ad>}}

## What can we use instead of React.FC?

The core of the criticism is that **React.FC adds the children implicitly, going against the explicit nature of typescript**.

Just like using [the Go programming language]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="en" >}}) for its compiler.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1741885083/rust-meme-typescript_xa6ajl.webp" class="md-local-image" alt="Typescript decided to use Go for its compiler instead of Rust, making some Rust developers furious" caption="Typescript decided to use Go for its compiler instead of Rust, making some Rust developers furious" >}}

However, the discussion I am talking about is just that, a discussion, it is not written in stone, you may consider that it is better to sacrifice a bit of readability in favor of convenience or, on the contrary, you may believe that it is important to be explicit when working with typescript.

If this is the case, consider that you can always declare the children as a prop explicitly, just as you would any other prop. And in the same way, you can declare the return value of your component as a JSX type element.

```jsx
interface propsWithChildren {
    children: React.ReactNode
}

const Component = ({ children }: propsWithChildren): JSX.Element => {
    return (
        <div>{children}</div>
    )
}

export default Component
```

Typescript should not warn you about any errors with this approach to the problem.

## Other resources on React FC usage

Below are links to the original discussion and some posts on this topic.

* [Eliminate React.FC from typescript template](https://github.com/facebook/create-react-app/pull/8177)
* [Why you probably shouldn't use react fc to type your react components](https://medium.com/raccoons-group/why-you-probably-shouldnt-use-react-fc-to-type-your-react-components-37ca1243dd13)
* [React Typescript' React.FC](https://www.harrymt.com/blog/2020/05/20/react-typescript-react-fc.html)