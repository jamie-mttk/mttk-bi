export const dm1={
    "_id" : "65bf2b6f55cf9c46bd311fc0",
    "description" : "为了后续测试和开发手工编写,不兼容以前的模式",
    "name" : "新数据模型手工编写",
    "app" : "64c0c4431d11926f30bc09a1",
    "jdbcConnection" : "65bf2d9ece148d1aa3b0d97f",
    "entities" : [
        {
            "key" : "unique10",
            "type" : "table",
            "name" : "订单表",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "sales_order",
            "alias" : "so",
            "filter" : "so.status='1'",
            "sort" : "so.create_time desc"
        },
        {
            "key" : "unique20",
            "type" : "table",
            "name" : "经销商表",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "dealer",
            "alias" : "dealer_wow"
        },
        {
            "key" : "unique30",
            "type" : "sql",
            "name" : "区域",
            "description" : "alias是必须的,计算属性如果需要可以使用此引用",
            "alias" : "area_ok",
            "sql" : "SELECT a0.id as province_id,a0.code as province_code,a0.name as province_name,\r\na1.id as city_id,a1.code as city_code,a1.name as city_name,\r\na2.id as area_id,a2.code as area_code,a2.name as area_name\r\n FROM dms21.area as a0\r\nright join dms21.area as a1 on a1.parent=a0.id\r\nright join dms21.area as a2 on a2.parent=a1.id\r\nwhere a0.level=0"
        }
    ],
    "relations" : [
        {
            "source" : "unique10",
            "target" : "unique20",
            "joinType" : "LEFT JOIN",
            "keys" : [
                {
                    "sourceKey" : "dealer",
                    "targetKey" : "id"
                }
            ]
        },
        {
            "source" : "unique20",
            "target" : "unique30",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "area",
                    "targetKey" : "area_id"
                }
            ]
        }
    ],
    "columns" : [
        {
            "key" : "unique10_id",
            "dataType" : "string",
            "label" : "订单编号",
            "type" : "field",
            "entity" : "unique10",
            "column" : "id"
        },
        {
            "key" : "unique10_order_time",
            "dataType" : "datetime",
            "label" : "订单时间",
            "type" : "field",
            "entity" : "unique10",
            "column" : "order_time"
        },
        {
            "key" : "aabbcc",
            "dataType" : "time",
            "label" : "创建真实时间",
            "type" : "expression",
            "entities" : [
                "unique10"
            ],
            "expression" : "time(so.create_time)"
        },
        {
            "key" : "unique10_type",
            "dataType" : "integer",
            "label" : "类型",
            "type" : "field",
            "entity" : "unique10",
            "column" : "type"
        },
        {
            "key" : "unique10_code",
            "dataType" : "string",
            "label" : "订单代码",
            "type" : "field",
            "entity" : "unique10",
            "column" : "code"
        },
        {
            "key" : "unique10_amount_request",
            "dataType" : "number",
            "label" : "总金额",
            "type" : "field",
            "entity" : "unique10",
            "column" : "amount_request"
        },
        {
            "key" : "unique10_amount",
            "dataType" : "number",
            "label" : "实付金额",
            "type" : "field",
            "entity" : "unique10",
            "column" : "amount"
        },
        {
            "key" : "unique20_code",
            "dataType" : "string",
            "label" : "经销商编号",
            "type" : "field",
            "entity" : "unique20",
            "column" : "code"
        },
        {
            "key" : "unique20_name",
            "dataType" : "string",
            "label" : "经销商名称",
            "type" : "field",
            "entity" : "unique20",
            "column" : "name"
        },
        {
            "key" : "a123456",
            "label" : "地址层级",
            "type" : "hierarchy",
            "children" : [
                {
                    "key" : "unique30_province_name",
                    "dataType" : "string",
                    "label" : "省",
                    "type" : "field",
                    "entity" : "unique30",
                    "column" : "province_name"
                },
                {
                    "key" : "unique30_city_name",
                    "dataType" : "string",
                    "label" : "市",
                    "type" : "field",
                    "entity" : "unique30",
                    "column" : "city_name"
                },
                {
                    "key" : "unique30_area_name",
                    "dataType" : "string",
                    "label" : "区",
                    "type" : "field",
                    "entity" : "unique30",
                    "column" : "area_name"
                }
            ]
        },
        {
            "key" : "e111223",
            "dataType" : "string",
            "label" : "经销商完整地址",
            "type" : "expression",
            "entities" : [
                "unique20",
                "unique30"
            ],
            "expression" : "concat(area_ok.province_name,area_ok.city_name,area_ok.area_name,dealer_wow.address_biz)"
        }
    ]
}

export const dm2={
    "_id" : "65c047ffb055da1fdeeff5e1",
    "description" : "为了验证程序能够正确的生成需要的表关联",
    "name" : "超级复杂实体结构",
    "app" : "64c0c4431d11926f30bc09a1",
    "jdbcConnection" : "65bf2d9ece148d1aa3b0d97f",
    "entities" : [
        {
            "key" : "unique10",
            "type" : "table",
            "name" : "订单表",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "sales_order",
            "alias" : "so",
            "filter" : "so.status='1'",
            "sort" : "so.create_time desc"
        },
        {
            "key" : "unique20",
            "type" : "table",
            "name" : "经销商表",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "dealer",
            "alias" : "dealer_wow"
        },
        {
            "key" : "unique30",
            "type" : "sql",
            "name" : "区域",
            "description" : "alias是必须的,计算属性如果需要可以使用此引用",
            "alias" : "area_ok",
            "sql" : "SELECT a0.id as province_id,a0.code as province_code,a0.name as province_name,\r\na1.id as city_id,a1.code as city_code,a1.name as city_name,\r\na2.id as area_id,a2.code as area_code,a2.name as area_name\r\n FROM dms21.area as a0\r\nright join dms21.area as a1 on a1.parent=a0.id\r\nright join dms21.area as a2 on a2.parent=a1.id\r\nwhere a0.level=0"
        },
        {
            "key" : "unique40",
            "type" : "table",
            "name" : "经销商管理机构",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "org",
            "alias" : "org_direct"
        },
        {
            "key" : "unique50",
            "type" : "table",
            "name" : "经销商高级机构",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "org",
            "alias" : "org_high"
        },
        {
            "key" : "unique60",
            "type" : "table",
            "name" : "组织机构用区域",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "area",
            "alias" : "area_org"
        },
        {
            "key" : "unique70",
            "type" : "table",
            "name" : "组织机构用区域-市-测试名字很长",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "area",
            "alias" : "area_org_city"
        },
        {
            "key" : "unique80",
            "type" : "table",
            "name" : "组织机构用区域-省",
            "description" : "",
            "catalog" : null,
            "schema" : "dms21",
            "table" : "area",
            "alias" : "area_org_province"
        }
    ],
    "relations" : [
        {
            "source" : "unique10",
            "target" : "unique20",
            "joinType" : "LEFT JOIN",
            "keys" : [
                {
                    "sourceKey" : "dealer",
                    "targetKey" : "id"
                }
            ]
        },
        {
            "source" : "unique20",
            "target" : "unique30",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "area",
                    "targetKey" : "area_id"
                }
            ]
        },
        {
            "source" : "unique10",
            "target" : "unique40",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "org_invoice",
                    "targetKey" : "id"
                }
            ]
        },
        {
            "source" : "unique40",
            "target" : "unique50",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "parent",
                    "targetKey" : "id"
                }
            ]
        },
        {
            "source" : "unique40",
            "target" : "unique60",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "area",
                    "targetKey" : "id"
                }
            ]
        },
        {
            "source" : "unique60",
            "target" : "unique70",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "parent",
                    "targetKey" : "id"
                }
            ]
        },
        {
            "source" : "unique70",
            "target" : "unique80",
            "joinType" : "INNER JOIN",
            "keys" : [
                {
                    "sourceKey" : "parent",
                    "targetKey" : "id"
                }
            ]
        }
    ],
    "columns" : [
        {
            "key" : "unique10_id",
            "dataType" : "string",
            "label" : "订单编号",
            "type" : "field",
            "entity" : "unique10",
            "column" : "id"
        },
        {
            "key" : "unique10_order_time",
            "dataType" : "datetime",
            "label" : "订单时间",
            "type" : "field",
            "entity" : "unique10",
            "column" : "order_time"
        },
        {
            "key" : "unique10_type",
            "dataType" : "integer",
            "label" : "类型",
            "type" : "field",
            "entity" : "unique10",
            "column" : "type"
        },
        {
            "key" : "unique10_code",
            "dataType" : "string",
            "label" : "订单代码",
            "type" : "field",
            "entity" : "unique10",
            "column" : "code"
        },
        {
            "key" : "unique10_amount_request",
            "dataType" : "number",
            "label" : "总金额",
            "type" : "field",
            "entity" : "unique10",
            "column" : "amount_request"
        },
        {
            "key" : "unique10_amount",
            "dataType" : "number",
            "label" : "实付金额",
            "type" : "field",
            "entity" : "unique10",
            "column" : "amount"
        },
        {
            "key" : "unique20_code",
            "dataType" : "string",
            "label" : "经销商编号",
            "type" : "field",
            "entity" : "unique20",
            "column" : "code"
        },
        {
            "key" : "unique20_name",
            "dataType" : "string",
            "label" : "经销商名称",
            "type" : "field",
            "entity" : "unique20",
            "column" : "name"
        },
        {
            "key" : "a123456",
            "label" : "地址层级",
            "type" : "hierarchy",
            "children" : [
                {
                    "key" : "unique30_province_name",
                    "dataType" : "string",
                    "label" : "省",
                    "type" : "field",
                    "entity" : "unique30",
                    "column" : "province_name"
                },
                {
                    "key" : "unique30_city_name",
                    "dataType" : "string",
                    "label" : "市",
                    "type" : "field",
                    "entity" : "unique30",
                    "column" : "city_name"
                },
                {
                    "key" : "unique30_area_name",
                    "dataType" : "string",
                    "label" : "区",
                    "type" : "field",
                    "entity" : "unique30",
                    "column" : "area_name"
                }
            ]
        },
        {
            "key" : "e111223",
            "dataType" : "string",
            "label" : "经销商完整地址",
            "type" : "expression",
            "entities" : [
                "unique20",
                "unique30"
            ],
            "expression" : "concat(area_ok.province_name,area_ok.city_name,area_ok.area_name,dealer_wow.address_biz)"
        },
        {
            "key" : "unique40_name",
            "dataType" : "string",
            "label" : "直接管理机构名称",
            "type" : "field",
            "entity" : "unique40",
            "column" : "name"
        },
        {
            "key" : "unique50_name",
            "dataType" : "string",
            "label" : "高级管理机构名称",
            "type" : "field",
            "entity" : "unique50",
            "column" : "name"
        },
        {
            "key" : "unique60_name",
            "dataType" : "string",
            "label" : "直接管理机构区域名称",
            "type" : "field",
            "entity" : "unique60",
            "column" : "name"
        },
        {
            "key" : "unique70_name",
            "dataType" : "string",
            "label" : "直接管理机构区域-市名称",
            "type" : "field",
            "entity" : "unique70",
            "column" : "name"
        },
        {
            "key" : "unique80_name",
            "dataType" : "string",
            "label" : "直接管理机构区域-省名称",
            "type" : "field",
            "entity" : "unique80",
            "column" : "name"
        }
    ]
}