# Waypoint Wizard

This project is to demonstrate & visualize a path finding technique by implementing A\* Search Algorithm in Angular

## Features

- Users can set up the size of a grid
- Users can set up a start node, an end node as well as wall nodes, which are obstacles that block the path
- Users can clear the set up and start over, or start simulating to find an optimal path from the start node to the end node

## Used Data Structures

- Array
- Min Heap

## Project and A\* Search Algorithm Implementation

1. Create a grid n \* m
2. Let users to setup start node, end node, wall nodes
3. Use Manhattan Distance to calculate following values for all the nodes in the grid:
   - g cost = distance between the start node and the a node at current position
   - h cost = heuristic value which can vary depending on how you define the h cost. In this project, h cost is distance between a node at current postion and the end node
   - f cost = g cost + h cost
4. Starting from the start node, look at the neighboring nodes (north, south, east and west, no diagonal nodes), and add these nodes into a min heap
5. Pop a node from the min heap (which has the lowest f cost), and set the node as current node
6. Repeat step #4 and #5, until the current node is at the end node
7. Backtrack the path from the end node to the start node, to visualize the optimal path to the user

## Tech Stack

![Static Badge](https://img.shields.io/badge/Angular-blue)
![Static Badge](https://img.shields.io/badge/Typescript-blue)
![Static Badge](https://img.shields.io/badge/A*_Search_Algorithm-blue)

## Demo

![](images/demo.gif)
