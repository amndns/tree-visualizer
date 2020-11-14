# Contributing to Tree Visualizer

First off, thanks for taking the time to contribute!

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owner of this repository before making a change.

## Table of Contents
  - [Setting Up the Project Locally](#setting-up-the-project-locally)
  - [Submitting a Pull Request](#submitting-a-pull-request)

## Setting Up the Project Locally

To install the project you need to have `node`, `npm`, and `yarn`.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project and then clone your fork:

```sh
$ git clone https://github.com/<your-username>/tree-visualizer.git
$ cd tree-visualizer
```

2. Your environment needs to be running `node` version >= 15.1.0, `npm` version >= 7.0.8, and `yarn` version >= 1.22.5.

3. From the root of the project, run `yarn` to install all dependencies.

4. From the root of the project, run `yarn start` to start the app in development mode. 

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```sh
> $ git remote add upstream https://github.com/amndns/tree-visualizer.git
> $ git fetch upstream
> $ git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream", then
> fetch the git information from that remote, and then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Submitting a Pull Request

Please go through the existing issues and pull requests to check if somebody else is already working on it. Also, make sure to run the tests and lint the code before you commit your changes.

```sh
$ yarn test
$ yarn lint
```