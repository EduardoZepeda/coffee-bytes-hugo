---
title: "How to create a secure password?"
date: "2020-07-02"
categories:
- linux and devops

coverImage: "images/como_escribir_una_buena_contraseña.jpg"
description: "Learn how to create a secure password that protects your personal accounts, and those of your clients, from cybercriminals."
keywords:
- linux
- opinion

authors:
- Eduardo Zepeda
---

One of my friends worked as an IT security auditor for a company whose name I will not mention for obvious reasons. Eventually our conversion got to the topic of his day to day work life, I asked him about his duties at the company and he replied that his job consisted mainly of nagging and educating employees about how weak their passwords were. The critical part of this is that many of those employees were in charge of setting up the computer systems for the clients they worked for. Yes, IT professionals being careless with their passwords, you'd think it would be impossible, but it's far more common than you'd think. Very few people know how to create a secure password.

For the above reason I have decided to share a bit of what I have read about it in blogs, books and videos.

## Weak passwords are risky

They say that a chain is only as strong as its weakest link. Passwords are in many cases the weakest link. A computer system may be free of vulnerabilities and have the latest security patches, but it's no good if all that is protected by a weak password. And no, I'm not talking about abandoning passwords like "admin123" or "firulais" in favor of their modified versions: "4dm1n123" or "f1rul415". I'm talking about the fact that passwords should be more of a wall for attackers than a second entrance to your systems.

## What does a secure password look like?

What characteristics must a password have to be secure? A secure password must have several characteristics to make life difficult for cyber criminals. Here are my tips for creating a good and secure password.

## Create a long password

**The shorter a password is, the easier it is to obtain it by brute force. Considering the current processing power of computers, passwords with less than 8 characters are practically an invitation for someone to enter our accounts.

```bash
**** # Pésimo
******** # Mal
******************** # Bien
```

## Keep your passwords separate from personal information

It's tempting enough to create an easy-to-remember password using your partner's name, your birthday or the name of your loved ones, your address, your cell phone number or your pet's name, but it's very insecure; anyone can have access to that information. A quick look at your social networks or a chat with one of your acquaintances is enough to get all that information.

"But, what happens is that my password is a mixture of those things", no, still, it's not enough. There are programs like [JohnTheRipper](https://github.com/magnumripper/JohnTheRipper) capable of generating all possible combinations from your personal data, so it is not secure in any way. Your password should not have parts that can be obtained from a conversation with you or your acquaintances. Again, **your password should not be based on any personal information related to you.

```bash
CalleFalsa123 # Mal, no nombres de donde vives, o de series que te gustan
5555551111 # No uses tu celular de contraseña
19-oct-1990 # Tu fecha de nacimiento no debería estar en una contraseña
```

## Avoid passwords that appear in dictionaries

There are a lot of dictionaries on the net with the most popular passwords, such as [rockyou](https://github.com/praetorian-code/Hob0Rules/blob/master/wordlists/rockyou.txt.gz), some even list all those passwords that have been obtained from website hacks.

Make sure that your password is not in any of these dictionaries. A potential attacker will always use passwords from the most common dictionaries to try to compromise a system, if your password is in one of these dictionaries it is almost certain that your account will be an easy target.

```bash
# Estas contraseñas están en el top de contraseñas más comunes
# NO LAS USES
iloveyou 
Qwerty
password1
adobe123
```

## Use a different password for each web site.

There are many people who use a single password for all their websites; email, social networks, hosting, cell phones, etc.

A single password is very easy to remember, but if someone finds out, they will have access to all the accounts you have under the same password. It is much better to have a different password for each website. That way, in case someone finds out that password, only one account will be compromised. In addition, if a leak of any website occurs, the rest of your accounts will remain safe.

```bash
# EVITA HACER ESTO
Contraseñas para aws, gmail, netifly, banco: password1
# MEJOR HAZ ESTO, UNA CONTRASEÑA DIFERENTE PARA CADA SITIO WEB
aws: Hc4NL5sDr7VvhgL3AkTk
gmail: caJiJiNa9fUWQ6GZRHdB
netifly: 2Sdmsi2CaVZksfEEVf5U
```

## Avoid sequential characters

Many passwords contain sequential characters such as "1234", "abcde", "xyz", "789".

Prevents characters from having a predictable sequence. Make sure that the different characters in your passwords are not next to each other in the alphabet or ordinal numbers.

```bash
# MAL, EVITA ESTO
Increible123
potato789
xyz123456
abc2020
```

## Variety is good

**Make sure your password includes uppercase, lowercase, special characters and numbers, mixed**. This way we greatly increase the number of attempts an attacker has to make to obtain a password, since now he will have to include special characters, numbers, uppercase and lowercase letters in each attempt.

```bash
# 
aliensaristoteleselectron # Minúsculas
AliensAristotelesElectroN # Minúsculas y mayúsculas
9Aliens1Aristoteles32ElectroN # Mayúsculas, minúsculas y números
9[Aliens]1|Aristoteles|32-ElectroN- #Mayúsculas, minúsculas, números y caracteres especiales
```

## Make sure that the estimated time to break your password is long.

You must remember that **absolutely all passwords can be obtained by brute force**, what makes the difference is the time it takes to achieve this. When we create a strong password we are not aiming to have a password that is impossible to break, **but one where the time it takes to break it makes it impractical for the attacker**, **there are websites where you can find out the estimated time to obtain a given password by brute force.

**Important note:** The website I will post is for informational purposes. **Never type a password you use (or will use) on a website you don't know** (including this one), you don't know if they can store it for later use. I already made sure that the website doesn't send web requests when used. But, even so, it's bad practice to type your passwords on other websites, don't do it.

Well, once warned you can visit it by going to [this link](https://howsecureismypassword.net/). Anyway here are some examples of passwords and the approximate time it would take to break them by brute force.

| Contraseña                      | Tiempo                |
| ------------------------------- | --------------------- |
| firulais                        | 5 seconds             |
| admin123                        | 1 minute              |
| F1rul415                        | 1 minute              |
| unP3rritoTrist3:(               | 3 quadrillions years  |
| jXkeLCfcPfTqtCFEtMFy            | 16 quadrillions years |
| v&lt;eVZ&amp;C=&gt;-h-3H9`%y5*  | 6 Sextillion years    |
| Aristoteles-Tira-Rocas-A-Platon | 300 undecillion years |


Data obtained from https://howsecureismypassword.net

It can be seen that even though including numbers in a password does not automatically make it strong, on the other hand the longer the password and the presence of special characters. It does not necessarily have to be an unreadable password composed of random characters, in fact it is often better to have a password composed of words or a phrase that makes sense **only to you.

## A little more about security

Even if you have a very strong password it will be completely useless if an attacker figures it out using methods other than brute force. Here are a few tips on computer security related to passwords.

* Avoid entering your password on public computers, you never know if there is a physical or virtual keylogger installed.
* Stay away from websites that are not encrypted, always prefer websites that use HTTPS instead of HTTP.
* Don't enter passwords on public networks, such as coffee shops or open networks, you never know if the network is falling prey to a MITM attack.
* Beware of people looking at you as you type, sometimes it is more effective for an attacker to take a direct look at your passwords as you type them than to discover a vulnerability in your system.
* Never write down your passwords on sticky notes or notebooks that can be accessed by others. Pasting your passwords in your office cubicle is a lousy idea.
* Never ever tell your passwords to absolutely anyone by phone or other means, this is a social engineering tactic with a high success rate and we can all become victims in an oversight.

## There are easier ways to manage passwords

But isn't all of the above a lot of hassle? Yes, in fact it is quite complicated to maintain a secure system using strong passwords, that's why there are programs and websites that take care of managing your passwords so you don't have to worry about many of the things I just mentioned. Enter the following post to know keepassx, the tool I currently use to manage my passwords and learn how to use it.