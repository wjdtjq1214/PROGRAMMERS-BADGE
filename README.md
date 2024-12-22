## 🤖 프로그래머스 랭킹 뱃지 자동 생성 봇

아래의 두 레퍼런스 프로젝트를 **참고**하여 만들었습니다. 🔍

> - 프로그래머스 프로필 SVG 자동 생성 프로젝트 (https://github.com/libtv/github-programmers-rank)
> - 백준 프로필 SVG 자동 생성 프로젝트 (https://github.com/mazassumnida/mazassumnida)

<br/>
<br/>
  
Github 프로필에서 프로그래머스 프로필 뱃지를 이쁘게 보여주는 프로젝트입니다. 
  

<br/>
<br/>

## ⚠️ 전제 조건

- [백준 허브](https://github.com/BaekjoonHub/BaekjoonHub) 익스텐션에 연동된 레포트지토리가 필요합니다.
- 깃허브 **PAT(Personal Access Token)** 필요합니다.

<br/> 

[백준 허브](https://github.com/BaekjoonHub/BaekjoonHub)에 연동된 레포트지토리를 트리거로 사용하므로 미리 설치되어 있어야합니다. 

백준 허브가 연동된 이후 프로그래머스에서 알고리즘 풀이시 자동으로 뱃지가 생성되거나 업데이트됩니다.

<br/>
<br/>

## 🔎 결과물 미리보기

- 스킬 체크 레벨을 기반으로 프로필 색상이 변경됩니다.
- 프로필 뱃지 유형은 기본형과 MINI 두가지 유형을 제공합니다. **(🚧 MINI 프로필 뱃지는 작업중입니다!)**

<br/>

#### 기본형

- 0 레벨 🍂

  ![0](https://github.com/user-attachments/assets/67375ed3-bc98-4b09-94e0-bf2e8abc1a4c)

- 1 레벨 💍

  ![1](https://github.com/user-attachments/assets/87a898b2-07f0-4d57-9dda-73d420fb85c3)

- 2 레벨 🏅

  ![2](https://github.com/user-attachments/assets/37a5507c-5363-4223-8f55-1b52babff55c)

- 3 레벨 💚

  ![3](https://github.com/user-attachments/assets/9bea1ddb-4f32-4530-be3e-c6c219e82848)

- 4 레벨 💎

  ![4](https://github.com/user-attachments/assets/246a209b-8f3a-4ec0-8567-350c3f3ef67e)
        
- 5 레벨 🍒
  
  ![5](https://github.com/user-attachments/assets/5fa40784-8e93-43da-99db-b6d145116cb2)

<br/>
<br/>

#### <del>MINI</del>

**🚧 MINI 프로필 뱃지는 작업중입니다!**

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
             repository: {Github 계정명}/{레포지토리명}
             event-type: trigger-workflow
    ```

    > `repository: {Github 계정명}/{레포지토리명}` 예시로 저의 경우엔 **JH8459/PROGRAMMERS-BADGE** 입니다.

  <br/>

#### 6. 프로그래머스에서 문제 풀이 후 PROGRAMMERS-BADGE 프로젝트에서 결과물 확인

  - 프로그래머스 문제 풀이 후 백준 허브에 연동된 레포지토리의 액션 로그를 확인합니다.
  - PROGRAMMERS-BADGE 프로젝트에서의 액션 로그를 확인합니다.
  - 위 과정에서 문제가 없었다면, PROGRAMMERS-BADGE 프로젝트에서 `static` 폴더에 .svg 포맷의 프로그래머스 랭킹 뱃지 결과물을 확인합니다.
  - 원하는 랭킹 뱃지 유형을 확인 후 깃허브 프로필에 링크를 붙혀넣습니다.

    > https://raw.githubusercontent.com/{Github 계정명}/{레포지토리명}/master/static/result.svg
  
<br/>
<br/>


