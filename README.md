## 🤖 프로그래머스 랭킹 뱃지 자동 생성 봇

https://github.com/libtv/github-programmers-rank 레퍼런스를 참고하여 만들었습니다.
  
깃허브 프로필에 사용할 목적의 프로그래머스 랭킹 뱃지(.svg)를 자동으로 생성하고 업데이트 합니다.
  
[백준 허브](https://github.com/BaekjoonHub/BaekjoonHub)에 연동된 레포트지토리를 트리거로 사용하므로 설치되어 있어야합니다.
  
백준 허브에 연동된 상태에서 프로그래머스에서 알고리즘 풀이시 자동으로 뱃지가 생성되거나 업데이트됩니다.

<br/>
<br/>

## ⚠️ 전제 조건

[백준 허브](https://github.com/BaekjoonHub/BaekjoonHub)에 연동된 레포트지토리가 필요합니다.

깃허브 **PAT(Personal Access Token)** 필요합니다.

<br/>
<br/>

## 🧠 동작 원리

<details>
  <summary>펼쳐보기</summary>

  1. 프로그래머스에서 알고리즘 문제를 풀이합니다.
  2. 백준 허브에 연동된 레포지토리에 자동으로 커밋됩니다.
  
      ![auto commit](https://github.com/user-attachments/assets/ce37c39f-abf1-4f0b-90d5-7eef5d116b9c)
     
  4. 백준 허브에 연동된 레포지토리에 커밋이 되면 미리 작성한 깃허브 액션이 동작합니다. (트리거를 동작시킬 간단한 액션입니다.)
  
     ![trigger action](https://github.com/user-attachments/assets/9438fa60-cbaf-4cce-8ed7-b0bfdccbba71)
  
  5. PROGRAMMERS-BADGE 레포지토리에 정의한 트리거 액션이 동작하며 미리 정의한 소스 코드가 동작하여 .svg 포맷의 프로그래머스 랭킹 뱃지가 자동 생성됩니다.
</details>

<br/>
<br/>

## 🔎 결과물 미리보기

기본형과 커스텀된 뱃지를 제공합니다. (커스텀 뱃지는 작업중입니다!)

<details>
  <summary>기본형</summary>

  <img width="450" height="180" src="https://raw.githubusercontent.com/JH8459/PROGRAMMERS-BADGE/master/static/result_full.svg"/>
</details>

<details>
  <summary><del>기본형 (색상 Ver.)</del></summary>
  
</details>

<details>
  <summary><del>축소형</del></summary>
  
</details>

<details>
  <summary><del>축소형 (색상 Ver.)</del></summary>
  
</details>

<br/>
<br/>

## ℹ️ 설치 방법

#### 1. <a href="https://github.com/JH8459/PROGRAMMERS-BADGE" target="_blank">PROGRAMMERS-BADGE 프로젝트</a>를 포크합니다.

  ![fork](https://github.com/user-attachments/assets/0d68e181-41a4-4654-bc4c-32d166f9ce4f)
  
  <br/>

#### 2. PROGRAMMERS-BADGE 프로젝트에서 깃허브 액션에 사용될 시크릿 키를 등록합니다.

  ![secret_key](https://github.com/user-attachments/assets/58cb57f5-c06b-4cc9-b242-2189d10e4a4e)

  - **GH_PAT:** `GitHub Personal Access Token` 값 입니다.

    > `ghp_....` 로 시작하곤합니다.
  
  - **GH_REPOSITORY:** `{Github 계정명}/{레포지토리명}` 

    > 예시로 저의 경우엔 **JH8459/PROGRAMMERS-BADGE** 입니다.

  - **PROGRAMMERS_ID:** 프로그래머스 계정 ID입니다.

    > 프로그래머스 이메일 주소이며 소셜 로그인으로 사용중이시더라도 등록해주셔야합니다.

  - **PROGRAMMERS_PW:** 프로그래머스 계정 PW입니다.

  <br/>

#### 3. PROGRAMMERS-BADGE 프로젝트에서 액션을 활성화합니다.

  ![action_enable](https://github.com/user-attachments/assets/99b7d0fc-8c59-4f0b-85aa-71f591ad01bc)

  > 포크한 레포지토리의 액션은 기본으로 비활성화되어 있으므로 해당 버튼을 클릭하여 액션을 활성화시킵니다.

  <br/>

#### 4. 백준허브에 연동된 레포지토리에서 깃허브 액션에 사용될 시크릿 키를 등록합니다.

  ![action_secret](https://github.com/user-attachments/assets/e55dc536-4764-4167-9d1e-687262c996b5)

  - **GH_PAT:** `GitHub Personal Access Token` 값 입니다.

    > `ghp_....` 로 시작하곤합니다.

  <br/>

#### 5. 백준허브에 연동된 레포지토리에서 액션을 활성화합니다.

  ![action_enable](https://github.com/user-attachments/assets/b3902eef-cd91-4c89-b5c1-da0038b4ad8e)

  - **set up a workflow yourself** 클릭 후 아래의 `dispatch_action.yml`을 복사해서 넣어줍니다.

    ```yml
    name: dispatch_action

    on:
     push:
       branches:
         - master
    
    jobs:
     dispatch:
       runs-on: ubuntu-latest
       steps:
         - name: Trigger repository dispatch
           uses: peter-evans/repository-dispatch@v1
           with:
             token: ${{ secrets.GH_PAT }}
             repository: JH8459/PROGRAMMERS-BADGE // {Github 계정명}/{레포지토리명} 입니다.
             event-type: trigger-workflow
    ```

  <br/>

#### 6. 프로그래머스에서 문제 풀이 후 PROGRAMMERS-BADGE 프로젝트에서 결과물 확인

  - 프로그래머스 문제 풀이 후 백준 허브에 연동된 레포지토리의 액션 로그를 확인한다.
  - PROGRAMMERS-BADGE 프로젝트에서의 액션 로그를 확인한다.
  - 위 과정에서 문제가 없었다면, PROGRAMMERS-BADGE 프로젝트에서 `static` 폴더에 .svg 포맷의 프로그래머스 랭킹 뱃지 결과물을 확인한다.
  - 원하는 랭킹 뱃지 유형을 확인 후 깃허브 프로필에 링크를 붙혀넣는다.

    > https://raw.githubusercontent.com/{Github 계정명}/{레포지토리명}/master/static/result_full.svg
  
<br/>
<br/>


