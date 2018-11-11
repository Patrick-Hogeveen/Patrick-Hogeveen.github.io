---
layout: home
title: "Recursion"
date: 2018-11-11
author: Patrick
permalink: 2018/11/11/Recursion.html
---

  The overarching definition of recursion is something that is defined in terms of itself. Like making a recipe that requires some of whatever you are making in order to make it. Another funny one is PHP which is an example of a recursive acronym standing for PHP: hypertext processor. A very confusing concept. Most of us however know the computer science definition. Recursion is a problem solving technique that solves a problem by solving smaller versions of the same problem. 

	A large part of why recursion is used is that you can define a nearly infinite problem and all sub problems in only one statement. In most programming languages a recursive function is one that calls itself on a smaller version of itself. In example if you wanted a function to search for an element in a sorted list divide the list in half over and over and take the side the element would be on. You will eventually reach the element and the function will return it. 

  One danger of writing recursive algorithms is that they will not end. Having proper termination conditions is key a good recursive function as it will keep calling itself forever otherwise. Another important part of recursion is cases. Not all functions are simple some require different outputs on each recursive call so developing proper if statements for these eventualities is essential. For instance if you tried to make a power function with an input for base and power and a recursive call for the comminuted multiplication it wouldn’t work. You would need two one assuming the power is odd one assuming it's even.
