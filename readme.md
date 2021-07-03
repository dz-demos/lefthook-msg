# DEMO : auto prefix commit message

In this demo repo you can see how to automatically prefix commit messages
from [`commit-msg` git hook](https://git-scm.com/docs/githooks#_commit_msg).

For the demo I use [`@arkweid/lefthook`](https://www.npmjs.com/package/@arkweid/lefthook)
tool to manage git hooks. You can use any other tool - idea does not change. The only difference
is how you get the hook parameter.

# How it works

1. In `lefthook.yml` I set to run `commit-prefix.js` on `commit-msg`. And marked it to run in `node`.
2. According [the `commit-msg` docs](https://git-scm.com/docs/githooks#_commit_msg):
   > It takes a single parameter, the name of the file that holds the proposed commit log message.

   And `lefthook` provides it as the first argument for my `commit-prefix.js` script.
3. Now we can read from and write into this commit message file.
4. If script exits with zero exit code, whatever is in the file will be used as the commit message.
   By writing into the file we can have any commit message we want (even completely ignore the one from user).
5. If script exits with non-zero exit code it will cancel the commit operation. You can use this
   to reject the commit message

# TODO

- [ ] extract prefix from the branch name