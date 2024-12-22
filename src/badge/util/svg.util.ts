import { UserData } from '../../interface/programmers.interface';
import * as fs from 'fs';
import * as path from 'path';
import { Color } from '../../interface/color.interface';

/**
 * 뱃지(미니) SVG 문자열 생성 메소드
 * @description 프로그래머스에서 받아온 데이터를 이용하여 뱃지 SVG 문자열을 반환합니다.
 * @param userData
 * @returns {string}
 */
export const getSvgStr = (userData: UserData): string => {
  userData.skillCheck.level = 0;

  const colors: Color[] = [
    { start: '#F49347;', middle: '#984400;', end: '#492000;' }, // 0레벨 Bronze
    { start: '#939195;', middle: '#6B7E91;', end: '#1F354A;' }, // 1레벨 Silver
    { start: '#FFC944;', middle: '#FFAF44;', end: '#FF9632;' }, // 2레벨 Gold
    { start: '#8CC584;', middle: '#45B2D3;', end: '#51A795;' }, // 3레벨 Platinum
    { start: '#96B8DC;', middle: '#3EA5DB;', end: '#4D6399;' }, // 4레벨 Diamond
    { start: '#E45B62;', middle: '#E14476;', end: '#CA0059;' }, // 5레벨 Ruby
  ];
  const imagePath = path.join(__dirname, '../../../static/skill_check.png');
  const imageBase64 = fs.readFileSync(imagePath, 'base64');

  return `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="350px" height="170px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">

        <!-- CSS -->
        <style>
            .title_no {
                font-size: 3rem;
                font-weight: 1000;
                font-family: 'Noto Sans KR', sans-serif;
            }

            .title_id {
                font-size: 1.3rem;
                font-weight: 1000;
                font-family: 'Noto Sans KR', sans-serif;
            }
        
            .sub_title {
                font-size: 1rem;
                font-weight: 700;
                font-family: 'Noto Sans KR', sans-serif;
            }

            .value {
                font-size: 1rem;
                font-weight: 500;
                font-family: 'Noto Sans KR', sans-serif;
            }

            .group {
                animation: delayFadeIn 2s ease-in-out forwards
            }

            @keyframes delayFadeIn {
                0% { opacity: 0; }
                80% { opacity: 0; }
                100% { opacity: 1; }
            }
        </style>
        
        <!-- 그라데이션 색상 -->
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
                <stop offset="10%" style="stop-color: ${colors[userData.skillCheck?.level ?? 0].start}stop-opacity:1">
                    <animate attributeName="stop-opacity" values="0.7; 0.73; 0.9 ; 0.97; 1; 0.97; 0.9; 0.73; 0.7;" dur="4s" repeatCount="indefinite" repeatDur="01:00"/>
                </stop>
                <stop offset="55%" style="stop-color: ${colors[userData.skillCheck?.level ?? 0].middle}stop-opacity:1">
                    <animate attributeName="stop-opacity" values="1; 0.95; 0.93; 0.95; 1;" dur="4s" repeatCount="indefinite" repeatDur="01:00"/>
                </stop>
                <stop offset="100%" style="stop-color: ${colors[userData.skillCheck?.level ?? 0].end}stop-opacity:1">
                    <animate attributeName="stop-opacity" values="1; 0.97; 0.9; 0.83; 0.8; 0.83; 0.9; 0.97; 1;" dur="4s" repeatCount="indefinite" repeatDur="01:00"/>
                </stop>
            </linearGradient>
        </defs>
        <rect width="350" height="170" rx="10" ry="10" fill="url(#grad)"/>

        <line x1="34" y1="60" x2="34" y2="115" stroke-width="2" stroke="white">
            <animate attributeName="y2" dur="0.8s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.675 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="60 ; 60 ; 115"/>
        </line>

        <line x1="34" y1="115" x2="67" y2="135" stroke-width="2" stroke="white">
            <animate attributeName="x2" dur="1s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.8 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="34 ; 34 ; 67"/>
            <animate attributeName="y2" dur="1s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.8 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="115 ; 115 ; 135"/>
        </line>

        <line x1="67" y1="135" x2="100" y2="115" stroke-width="2" stroke="white">
            <animate attributeName="x2" dur="1.2s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.83333 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="67 ; 67 ; 100"/>
            <animate attributeName="y2" dur="1.2s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.83333 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="135 ; 135 ; 115"/>
        </line>

        <line x1="100" y1="115" x2="100" y2="60" stroke-width="2" stroke="white">
            <animate attributeName="y2" dur="1.5s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.8 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="115 ; 115 ; 60"/>
        </line>

        <line x1="67" y1="140" x2="34" y2="120" stroke-width="2" stroke="white">
            <animate attributeName="x2" dur="1.9s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.78947; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="67 ; 67 ; 34"/>
            <animate attributeName="y2" dur="1.9s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.78947 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="140 ; 140 ; 120"/>
        </line>

        <line x1="67" y1="140" x2="100" y2="120" stroke-width="2" stroke="white">
            <animate attributeName="x2" dur="1.9s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.78947 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="67 ; 67 ; 100"/>
            <animate attributeName="y2" dur="1.9s" fill="freeze" calcMode="spline" keyTimes="0 ; 0.78947 ; 1" keySplines="0 0 1 1 ; 0.5 0 0.5 1" values="140 ; 140 ; 120"/>
        </line>

        <g class="group">
            <image href="data:image/png;base64,${imageBase64}" x="15" y="15" height="50px" width="100px"/>

            <text text-anchor="middle" dominant-baseline="middle" x="65" y="95" class="title_no" style="fill:#ffffff;">${userData.skillCheck.level}</text>

            <text text-anchor="start" x="160" y="55" class="title_id" style="fill:#ffffff;">${userData.name}</text>
        </g>

        <g class="group">
            <text text-anchor="start" x="160" y="95" class="sub_title" style="fill:#ffffff;">Score</text>

            <text text-anchor="start" x="250" y="95" class="value" style="fill:#ffffff;">${userData.ranking.score.toLocaleString()}</text>
        </g>

        <g class="group">
            <text text-anchor="start" x="160" y="115" class="sub_title" style="fill:#ffffff;">Solved</text>

            <text text-anchor="start" x="250" y="115" class="value" style="fill:#ffffff;">${userData.codingTest.solved.toLocaleString()}</text>
        </g>

        <g class="group">
            <text text-anchor="start" x="160" y="135" class="sub_title" style="fill:#ffffff;">Rank</text>

            <text text-anchor="start" x="250" y="135" class="value" style="fill:#ffffff;">${userData.ranking.rank.toLocaleString()}</text>
        </g>

        </svg>
        `;
};
