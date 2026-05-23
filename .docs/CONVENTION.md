# Code Convention

## File Structure

- app/ : 라우팅 및 최소한의 레이아웃만 구성하며, Server Component만 포함합니다.
- components/
- content/
- hooks/
- utils/
- domains/ : 도메인별로 구성하며, 각 {Domain}에서만 사용되는 코드를 보관합니다.
  - {Domain}/
    - containers/ : UI/로직을 분리하기 위한 Container. 주로 Server Component에서 데이터를 조회 후 Client Component로 전달하는 역할을 합니다.
    - components/
    - hooks/
    - utils/
    - {feature-name}/ : 하나의 페이지 안에서 책임이 독립적인 컴포넌트를 둡니다.
      - components/
      - hooks/
      - utils/

### Domain Structure Rules

- [PREFER] 도메인 내부는 먼저 `list`, `detail`, `create`, `edit`처럼 사용자 플로우 기준으로 나눕니다.
- [PREFER] `feature-name`는 페이지 안에서 책임이 독립적인 경우에만 사용합니다.
  - e.g. `reservation/detail/dispatch`, `reservation/detail/recall`, `reservation/detail/payment`
- [PREFER] 파일 위치는 "어디에서 렌더링되는가"보다 "어떤 이유로 함께 수정되는가"를 기준으로 결정합니다.
- [PREFER] 두 개 이상의 feature에서 공유되는 컴포넌트/훅/유틸은 상위 `{Domain}/components|hooks|utils/`로 올립니다.
- [NEVER] 도메인 루트에 `modal`, `form`, `table`처럼 UI 형태 기준 폴더를 두지 않습니다.
- [NEVER] 도메인 내부 코드에서 다른 도메인의 코드를 직접 참조하지 않습니다.
- [NEVER] 단일 컴포넌트를 감싸기 위해 `{feature-name}/components/{same-name}.tsx` 구조를 만들지 않습니다.

## Naming

- 컴포넌트, 파일명은 동작 [도메인] [동작] [구조] 순서로 구성합니다.
- e.g.
  - UserEditForm
  - UserCreateModal
  - UserProfileView
  - UserListTable
  - UserHistoryModal
  - UserSearchAutocomplete

## URL Structure

- /users
- /users/:id
- /users/new
- /users/:id/edit

## JSX & Component Structure

- [NEVER] JSX 복잡도를 낮출 목적으로 컴포넌트 내부에서 로직을 분리하지 않습니다

```tsx
// Bad: render 함수
function MyComponent() {
  const renderHeader = () => ...;
return {renderHeader()};
}

  // Bad: let 변수 주입
  function MyComponent() {
    let content: ReactNode = null;
    if (condition) content = ;
    else content = ;
    return {content};
  }

// Good
function MyComponent() {
  return (
    ...
  );
}
```

- [PREFER] 아래 조건 중 하나라도 해당하면 별도 컴포넌트 파일로 분리합니다.
  - 2개 이상의 컴포넌트에서 사용되는 경우
  - 컴포넌트 간 책임이 독립적인 경우 (호출하는 API나 비즈니스 로직이 구분되는 경우)
- [PREFER] 위 조건에 해당하지 않으면 같은 파일 내에 선언합니다.

## Refactoring Judgment Criteria

리팩토링 요청 시 코드를 수정하기 전에 아래 순서로 판단합니다.

1. 이 컴포넌트가 하나의 역할만 갖고 있는가?

   - 역할이 둘 이상이라면 먼저 "서로 다른 이유로 수정될 코드인가?"를 판단합니다.
   - 서로 다른 이유로 수정될 코드라면 역할 단위로 컴포넌트를 분리합니다.
   - 이때 파일 분리는 기본 선택지이지만, 오직 부모 컴포넌트에서만 쓰이고 파일 분리가 과한 경우에는 같은 파일 안의 하위 컴포넌트로 분리할 수 있습니다.
   - 역할이 여러 개인 상태에서 render 함수나 조건 분기 정리만으로 덮지 않습니다.

2. JSX가 복잡하게 느껴지는가?

   - 복잡함의 원인이 "역할이 많아서"라면 1번으로 돌아갑니다.
   - 복잡함의 원인이 "조건 분기가 많아서"라면 역할 분리 없이도 읽을 수 있는지 먼저 판단합니다.
   - 같은 골격 안에서 일부 속성, 문구, 이벤트만 바뀐다면 객체 매핑으로 정리합니다.
   - 상태별로 보여주는 JSX 구조 자체가 달라진다면 early return 또는 하위 컴포넌트 분리를 사용합니다.

3. 내부를 정리하는 것이 맞다고 판단했는가?
   - render 함수, let 변수 주입, IIFE는 사용하지 않습니다.
   - JSX는 인라인으로 유지합니다.
   - 조건 분기를 변수에 담아 마지막에 주입하지 않습니다.
   - "무엇을 보여줄지"보다 "왜 분리했는지"가 먼저 읽히도록 이름을 붙입니다.
   - 객체 매핑은 아래처럼 "상태 -> 설정"이 분명할 때만 사용합니다.

```tsx
const STATUS_BUTTON_CONFIG = {
  confirmed: {
    label: "배차출발",
    color: "primary",
    onClick: handleStartDispatchClick,
  },
  inUse: {
    label: "차량회수",
    color: "primary",
    onClick: handleRecallClick,
  },
} as const;
```

## Refactoring Output Rules

- [PREFER] 하나의 컴포넌트가 요약 표시와 상태별 액션 처리처럼 서로 다른 역할을 동시에 가진다면, 액션 영역을 별도 컴포넌트로 분리합니다.
- [PREFER] 분리된 컴포넌트는 이름만 보고 책임이 드러나야 합니다.
  - e.g. `ReservationSummarySection`, `ReservationActionButton`
- [PREFER] 상태값에 따라 달라지는 UI는 아래 우선순위로 정리합니다.
  1. 상태별 설정값만 다르면 객체 매핑
  2. 상태별 반환 UI가 완전히 다르면 early return
  3. 상태별 이벤트와 모달 상태까지 함께 움직이면 별도 컴포넌트 분리
- [NEVER] "복잡한 JSX를 숨기기 위한 목적만으로" `renderXxx`, `getXxxElement`, `let content`, 즉시실행함수 패턴을 사용하지 않습니다.
- [NEVER] 단순 분기 정리를 위해 책임이 다른 이벤트 로직까지 요약/표시 컴포넌트 안에 남겨두지 않습니다.

## Example

```tsx
// Bad: 요약 컴포넌트가 액션 정책과 이벤트를 모두 가짐
function ReservationSummarySection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = async () => {
    ...
  };

  let actionButton = null;

  if (status === "confirmed") {
    actionButton = <Button onClick={handleActionClick}>배차출발</Button>;
  }

  return (
    <Panel>
      {summary}
      {actionButton}
    </Panel>
  );
}

// Good: 요약과 액션의 책임을 분리
function ReservationSummarySection() {
  return (
    <Panel>
      <Summary />
      <ReservationSummaryActionSection />
    </Panel>
  );
}

function ReservationSummaryActionSection() {
  if (status === "confirmed") {
    return <Button onClick={handleActionClick}>배차출발</Button>;
  }

  return null;
}
```
