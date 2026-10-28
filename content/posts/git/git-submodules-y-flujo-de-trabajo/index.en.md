---
aliases:
- /en/understand-how-git-submodules-works-and-its-workflow/
authors:
- Eduardo Zepeda
categories:
- git
- linux
coverImage: images/git-submodules.jpg
coverImageCredits: Image by 牛肉面 https://www.pixiv.net/en/users/14326617
date: '2022-05-18'
seo_title: "Git Submodules: Complete Guide with Examples"
description: Learn what Git Submodules are, how to use, update and work with them
  without errors. Beginner-friendly practical guide.
keyword: git submodule
keywords:
- git
- submodules
- repository
title: Understand How Git Submodules Works and its Workflow
---

A Git submodule is a record in a Git repository that points to a specific commit in an external repository. Submodules are tracked like separate repos - each has its own `.git` file pointing to where Git stores its data.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1745887883/coffee-bytes/gitSubmodulesSchema_nkmmd3.jpg" class="md-local-image" alt="Simplified outline of git submodules" caption="Simplified outline of git submodules"  width="744" height="576" >}}

Use submodules when you want to include third-party code while keeping control over which commit to use. Common cases:

- Shared themes/styles (like in Hugo static sites)
- Third-party libraries
- Repos used in a [Dockerfile]({{< ref path="/posts/docker/docker-curso-practico-con-ejemplos-en-gnu-linux/index.md" lang="en" >}})

Submodules add complexity. You need to track which repo you're in and update references carefully, especially with multiple submodules.

## Adding a submodule

Use `git submodule add` to add a submodule to an existing repo. If the destination directory doesn't exist, Git creates it.

```bash
git submodule add <url> <destination>
```

This clones the submodule into `<destination>`.

### Structure

After adding a submodule:

```bash
.
├── .gitignore
├── .gitmodules
├── <destination>
│   ├── .git
│   ├── .gitignore
│   └── ...
```

### The `.gitmodules` file

Git creates `.gitmodules` in the root of the main repo. It records each submodule's path, URL, and optionally a branch:

```ini
[submodule <destination>]
    path = <destination>
    url = <repository-url>
    branch = <branch>
```

This file needs to be committed so others can initialize the submodules.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1745887713/coffee-bytes/gitSubmodules_piogyh.jpg" class="md-local-image" alt="git submodules operation schematic" caption="Schematic of git submodules operation"  width="1200" height="900" >}}

### How submodules work

Inside a submodule, you'll find a `.git` file (not a directory) that points to the actual Git data in the main repo:

```bash
cd <destination>
cat .git
gitdir: ../.git/modules/<submodule>
```

Each submodule is its own Git repository. You can branch, commit, and push inside it independently. The main repo tracks which commit of the submodule it's using - **each commit in the main repo points to a specific commit in each submodule**.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1745888025/coffee-bytes/submodule-relation-commit_mxkmhf.jpg" class="md-local-image" alt="Git submodules-correspondence"  width="1200" height="498" >}}

{{<adsPanels>}}

{{<ad0>}}

## Workflow

When you change code inside a submodule, you need to update both repos. Otherwise, others will see the old submodule commit.

### Committing submodule changes

1. Commit and push changes in the submodule
2. Go back to the main repo and commit/push the updated submodule reference

```bash
# In submodule
git add <files>
git commit -m "Update submodule"
git push

# In main repo
cd <main-repo>
git add <submodule-path> .gitmodules
git commit -m "Update submodule reference"
git push
```

{{<ad1>}}

## Cloning a repo with submodules

When you clone a repo that has submodules, Git only clones the main repo - submodule directories will be empty.

Initialize and fetch submodule content:

```bash
git submodule update --init --recursive
```

Or clone with submodules in one go:

```bash
git clone --recurse-submodules <repo-url>
```

{{<ad2>}}

## Pulling updates with submodules

A `git pull` in the main repo doesn't update submodules automatically. After pulling, update them to match the commits the main repo points to:

```bash
git submodule update --recursive
```

To pull the latest changes from submodule remotes (if you want to track their latest commits):

```bash
git submodule update --recursive --remote
```

{{<ad3>}}