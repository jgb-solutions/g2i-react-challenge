export default function DefaultLayout({ children }) {
	return (
		<div
			style={{
				minHeight: "100vh",
			}}
			className="container-sm text-center d-flex align-items-center justify-content-center"
		>
			<div className="row">
				<div
					className="col-sm rounded p-4"
					style={{
						background: "#dfe0e0",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	)
}
