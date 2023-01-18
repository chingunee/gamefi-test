// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

struct Player {
    address p_address;
    string nickname;
    uint life; // without life cannot play a web mini-game and get a score.
    uint score; // can get a score by playing mini-game on web.
}