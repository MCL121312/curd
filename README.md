# CURD 项目架构设计

## 核心理念

**领域 + 运营 = 业务**

通过分层架构将业务逻辑、视图交互、运营工具进行职责分离。

```
src/shared/
├── viewModel/   # 视图模型层 - UI 状态管理
└── operation/   # 运营层 - 业务辅助工具
```

---

## 层次职责

### Domain (领域层)

核心业务逻辑层,变化频率最低

- 纯业务逻辑,不依赖框架
- 可独立测试
- 示例: 订单计算、库存扣减、价格策略

```typescript
// 纯函数实现业务规则
export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

---

### ViewModel (视图模型层)

UI 状态管理层,处理视图交互

- 管理组件状态(分页、表单、弹窗等)
- 响应式数据管理
- 已实现: `usePagination`、`useDialog`

```typescript
const { pagination, changePageNumber } = usePagination();
```

---

### Operation (运营层)

业务辅助工具层,支持运营需求

**核心职责**:
1. 数据导出导入、报表生成
2. 文件处理、批量操作
3. 第三方库封装(如 xlsx)

**设计原则**:
- 配置驱动
- 函数式组合
- 支持渐进式使用

**已实现**: `useExportExcel`

```typescript
const { arrayToExcel } = useExportExcel();
arrayToExcel(users, {
  id: { label: 'ID', width: 10 },
  name: { label: '姓名', width: 15 }
});
```

---

## 依赖关系

```
Views → ViewModel → Domain
     → Operation  ↗
```

**原则**:
- Domain 不依赖任何层
- ViewModel 和 Operation 可使用 Domain
- 同层之间避免依赖

---

## 开发规范

### 文件组织

```
src/shared/
├── core/[业务领域]/[功能].ts
├── viewModel/use[功能名]/index.ts
└── operation/use[功能名]/index.ts 
```

 

### 代码要求

**ViewModel**:
```typescript
export function useFeature() {
  const state = ref<Type>({ });
  function handleAction() { }
  return { state, handleAction };
}
```

**Operation**:
```typescript
export const useTool = () => {
  const step1 = <T>(input: T) => { };
  const step2 = <T>(input: T) => { };
  const execute = <T>(input: T, config: Config) => { };
  return { step1, step2, execute };
};
```

**Core**:
```typescript
// 纯函数,不依赖框架
export function businessRule(input: Type): Result {
  return result;
}
```

---

## 分层决策

| 场景 | 层次 |
|------|------|
| 表单/分页/弹窗状态 | ViewModel |
| 订单计算/权限判断 | core |
| Excel导出/批量处理 | Operation |

---

## 现有实现

- **ViewModel**: `usePagination`、`useDialog`
- **Operation**: `useExportExcel`

技术栈: Vue 3 + TypeScript + Vite + Naive UI