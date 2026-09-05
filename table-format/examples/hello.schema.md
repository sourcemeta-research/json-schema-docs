# Order

A single order placed by a customer.

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text; made of letters, numbers, dashes | yes, always | How this order is referred to everywhere else. |
| status | one of: draft, placed, shipped | no |  |
| items | a list, each one line; from 1 to any entries | yes, always |  |
| giftMessage | text; from any to 200 characters | no |  |

## All 1 shapes

Most used first, because everything else is built on them.

- **line** (used 1)

### line

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| sku | text | yes, always |  |
| quantity | a whole number; from 1 to 99 | yes, always |  |
