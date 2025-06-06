import { Box } from "@mantine/core";
import { useMemo } from "react";
import { Article, DocsPreview, TableTitle } from "~/screens/surrealist/docs/components";
import type { Snippets, TopicProps } from "~/screens/surrealist/docs/types";
import { useDocsTable } from "../../hooks/table";

export function DocsTablesCreatingRecords({ language }: TopicProps) {
	const table = useDocsTable();

	const snippets = useMemo<Snippets>(
		() => ({
			cli: `
		CREATE ${table.schema.name}:demo
		`,
			js: `
		db.create('${table.schema.name}');
		`,
			rust: `
		db.create("${table.schema.name}").await?;
		`,
			py: `
		# Create a record with a random ID
person = db.create('${table.schema.name}')
# Create a record with a specific ID
person = db.create(RecordID('${table.schema.name}', 'tobie'), {
	"name": 'Tobie',
	"settings": {
		"active": True,
		"marketing": True,
	}
})
		`,
			go: `
		db.Create("${table.schema.name}", map[string]interface{}{})
		`,
			csharp: `
		await db.Create("${table.schema.name}", data);
		`,
			java: `
		driver.create(thing, data)
		`,
			php: `
		$db->create("${table.schema.name}")
		`,
		}),
		[table.schema.name],
	);

	return (
		<Article
			title={
				<TableTitle
					title="Creating records"
					table={table.schema.name}
				/>
			}
		>
			<p>
				Add a new record to the table<b> {table.schema.name} </b>. The record will have a
				random record ID if not specified after the table name. You can also specify the
				fields of the record.
			</p>
			<Box>
				<DocsPreview
					language={language}
					title="Creating Records"
					values={snippets}
				/>
			</Box>
		</Article>
	);
}
